
import requests
import bs4
import time
import webbrowser
import datetime
import re
import random
import json
from pymongo import MongoClient
import os
import configparser

config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join("config.ini")))

client = MongoClient(config['PROD']['DB_URI_SHORT'])
db = client.CMUCal

headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "en-US,en;q=0.9",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36"
}

class ResourceEvent:
    def __init__(self, weekday, date, start_time, end_time, location):
        self.weekday = weekday # int 1-7
        self.date = date # datetime.date OR None (for reoccurring events)
        self.start_time = start_time # datetime.time
        self.end_time = end_time # datetime.time
        self.location = location # string
    
    def get_json(self):
        date = self.date
        if date is not None:
            date = date.strftime('%m-%d-%Y')
        
        json = {
            "weekday": self.weekday,
            "date": date,
            "start_time": self.start_time.strftime('%I:%M%p'),
            "end_time": self.end_time.strftime('%I:%M%p'),
            "location": self.location
        }
        return json
    
    def __str__(self):
        datestr = ""
        if self.date is not None:
            datestr = f"{self.date.strftime('%m-%d-%Y')} | "
        return f"{self.weekday} | {datestr}{self.start_time.strftime('%I:%M%p')} | {self.end_time.strftime('%I:%M%p')} | {self.location}"

class CourseResource:
    def __init__(self, resource_type, course_id, course_name, professor, instructor, events):
        self.resource_type = resource_type # "OH", "SI", "PT", "DIT"
        self.course_id = course_id # Course ID
        self.course_name = course_name  # Course Name
        self.professor = professor # Professor
        self.instructor = instructor # Instructor
        self.events = events # Events

    def to_json(self):
        json = {
            "resource_type": self.resource_type,
            "course_id": self.course_id,
            "course_name": self.course_name,
            "professor": self.professor,
            "instructor": self.instructor,
            "events": [event.get_json() for event in self.events]
        }
        return json

    def __str__(self):
        return f"{self.resource_type}: {self.course_id} | {self.course_name}\nP: {self.professor} | I: {self.instructor}\n" + '\n'.join([str(e) for e in self.events])

class OtherResource:
    def __init__(self, resource_type, resource_source, event_name, event_host, events, categories):
        self.resource_type = resource_type # "Career", "Club/School"
        self.resource_source = resource_source # "Handshake", "TartanConnect"
        self.event_name = event_name  # Event Name
        self.event_host = event_host # Event Host
        self.events = events # Events
        self.categories = categories # Categories

    def to_json(self):
        json = {
            "resource_type": self.resource_type,
            "resource_source": self.resource_source,
            "event_name": self.event_name,
            "event_host": self.event_host,
            "events": [event.get_json() for event in self.events],
            "categories": self.categories
        }
        return json

    def __str__(self):
        return f"{self.resource_type} - {self.resource_source}: {self.event_name} | {self.event_host} \n" + '\n'.join([str(e) for e in self.events])

class ScraperBot:
    def run(self):
        while True:
            self.run_scrapers()
            print("\nWaiting 10 minutes...\n")
            time.sleep(60 * 10)
    
    def run_scrapers(self):
        scrapers = [
            ("Supplemental Instruction", self.scrape_si, "supplemental-instruction", "si.json"),
            ("Drop In Tutoring", self.scrape_drop_in, "drop-in-tutoring", "drop_in.json"),
            ("Peer Tutoring", self.scrape_pt, "peer-tutoring", "peer_tutoring.json"),
            ("Handshake", self.scrape_handshake, "handshake", "handshake.json"),
            ("TartanConnect", self.scrape_tartanconnect, "tartanconnect", "tartanconnect.json"),
        ]
        for name, scraper_func, collection_name, json_file in scrapers:
            print(f"Running {name} scraper...")
            try:
                self.run_scraper(name, scraper_func, collection_name, json_file)
            except Exception as e:
                print(f"Error running {name} scraper: {e}")

    def run_scraper(self, name, scraper_func, collection_name, json_file):
        resources = scraper_func()
        self.save_resources_to_db(name, resources, collection_name, json_file)

    def save_resources_to_db(self, name, resources, collection_name, json_file):
        resources_json = [resource.to_json() for resource in resources]
        with open(json_file, "w") as outfile:
            json.dump(resources_json, outfile)

        #db[collection_name].delete_many({})
        result = db[collection_name].insert_many(resources_json)
        print(f"Inserted {len(result.inserted_ids)} {name} records into {collection_name} DB.")
        #[print(resource, "\n") for resource in si_resources]

    def scrape_si(self):
        link = "https://www.cmu.edu/student-success/programs/supp-inst.html"
        r = requests.get(link, headers=headers)
        soup = bs4.BeautifulSoup(r.text, 'html.parser')

        table = soup.find('table', id="si-table")

        if table is None:
            raise Exception("No table exists on SI website. Could be due to lack of courses (Summer time)")

        #print(table)
        
        resources = []
        for i, row in enumerate(table.find_all('tr')):
            if i != 0:
                data = row.find_all('th') + row.find_all('td')

                course_nameids = data[0].text.strip()
                courses_name_ids_parsed = re.findall(r'(\d{2}-\d{3})\s(.*?)(?=(\d{2}-\d{3})|$)', course_nameids)

                professor = data[1].text.strip()
                si_leader = data[2].text.strip()

                events = []
                for timedata in [t for t in data[3].contents if "-" in t]:
                    if timedata.startswith("("):
                        continue
                    weekday = timedata.split(" @ ")[0].rstrip("s")
                    weekday = time.strptime(weekday, "%A").tm_wday + 1
                    start_end = timedata.split(" @ ")[1].split(" - ")[0].split("-")
                    start_time = datetime.datetime.strptime(start_end[0], "%I:%M%p").time()
                    end_time = datetime.datetime.strptime(start_end[1], "%I:%M%p").time()
                    location = timedata.split(" - ")[1]
                    event = ResourceEvent(weekday, None, start_time, end_time, location)
                    events.append(event)
                
                for course in courses_name_ids_parsed:
                    course_id = course[0]
                    course_name = course[1].strip()
                    resource = CourseResource("SI", course_id, course_name, professor, si_leader, events)
                    resources.append(resource)
        return resources
    
    def scrape_drop_in(self):
        link = "https://www.cmu.edu/student-success/programs/tutoring.html"
        r = requests.get(link, headers=headers)
        soup = bs4.BeautifulSoup(r.text, 'html.parser')

        table = soup.find('table', id="dropintable")
        #print(table)

        if table is None:
            raise Exception("No table exists on Drop In website. Could be due to lack of courses (Summer time)")
        
        resources = []
        for i, row in enumerate(table.find_all('tr')):
            if i != 0:
                data = row.find_all('th') + row.find_all('td')

                course_nameids = data[0].text.strip()
                courses_name_ids_parsed = re.findall(r'(\d{2}-\d{3})\s(.*?)(?=(\d{2}-\d{3})|$)', course_nameids)

                start_time = datetime.time(hour=20)
                end_time = datetime.time(hour=22)
                weekday = data[1].text.strip()
                if "(" in weekday:
                    new_time = weekday.split(" (")[1].split(")")[0].strip().split("-")
                    try:
                        start_time = datetime.datetime.strptime(new_time[0], "%I:%M%p").time()
                    except ValueError:
                        start_time = datetime.datetime.strptime(new_time[0] + "pm", "%I:%M%p").time()
                    
                    try:
                        end_time = datetime.datetime.strptime(new_time[1], "%I:%M%p").time()
                    except ValueError:
                        end_time = datetime.datetime.strptime(new_time[1] + "pm", "%I:%M%p").time()
                    
                    weekday = weekday.split(" (")[0]
                
                weekday = time.strptime(weekday.rstrip("s"), "%A").tm_wday + 1
                location = data[2].text.strip()
                tutor = data[3].text.strip()

                events = [ResourceEvent(weekday, None, start_time, end_time, location)]
                
                for course in courses_name_ids_parsed:
                    course_id = course[0]
                    course_name = course[1].strip().strip("&").strip()
                    resource = CourseResource("DIT", course_id, course_name, None, tutor, events)
                    resources.append(resource)
        return resources
    
    def scrape_pt(self):
        email = "dkathein@andrew.cmu.edu"
        password = "CMUCalToTheMoon"

        link = "https://cmu.mywconline.net/index.php"
        s = requests.Session()
        r = s.get(link, headers=headers)

        payload = {
            "username": "dkathein@andrew.cmu.edu",
            "password": "CMUCalToTheMoon",
            "scheduleid": "sc64da3ea4c19b9",
            "setCookie": "1",
            "submit": "login"
        }
        r = s.post(link, data=payload, headers=headers)
        soup = bs4.BeautifulSoup(r.text, 'html.parser')

        courses = soup.find('select', id="limfoc").findAll('option')[1:]
        resources = []
        for course in courses:
            link = "https://cmu.mywconline.net/" + course.get("value")
            course = course.text.strip().rstrip(" Only")
            course_id, course_name = course.split(" ", 1)
            course_id = course_id[:2] + "-" + course_id[2:]
            professor = None
            print(f"{course_id} | {course_name} | {link}")

            r = s.get(link, headers=headers)
            soup = bs4.BeautifulSoup(r.text, 'html.parser')
            days = soup.findAll("div", style="overflow-x:auto;")
            
            appt_count = 0
            instructor_events = {}
            for day in days:
                weekday = day.find("th", class_="col_first fw-normal").text.strip()
                available_appts = day.findAll("td", {"aria-label": "Open/Available Appointment Slot"})
                for appt in available_appts:
                    apptdata = appt.get("title").strip()

                    time1 = apptdata.split("reserve <strong>")[1].split("<")[0]
                    month_day_yr = apptdata.split("on <strong>")[1].split("<")[0] + ", " + str(datetime.datetime.now().year)
                    start_time = datetime.datetime.strptime(f"{month_day_yr} {time1}", "%B %d, %Y %I:%M %p")
                    end_time = start_time + datetime.timedelta(hours=1)
                    date = start_time.date()
                    weekday = start_time.weekday() + 1

                    instructor = apptdata.split("with <strong>")[1].split("<")[0]
                    
                    event = ResourceEvent(weekday, date, start_time.time(), end_time.time(), "WCOnline")
                    if instructor not in instructor_events:
                        instructor_events[instructor] = []
                    instructor_events[instructor].append(event)

                    appt_count += 1
            
            for instructor, events in instructor_events.items():
                resource = CourseResource("PT", course_id, course_name, professor, instructor, events)
                resources.append(resource)

            print(f"Added {appt_count} appts.")
            time.sleep(0.5)
            #if appt_count > 40:
            #    break
        
        return resources


    def scrape_handshake(self):
        # This scraper needs to be improved to query above just the 30 most relevant. changing the limit=30 in handshake_req.txt doesn't seem to do anything...
        link = "https://app.joinhandshake.com/stu/graphql"
        s = requests.Session()
        r = s.get(link, headers=headers)

        with open("handshake_req.txt", "r") as f:
            payload = json.load(f)

        headers2 = headers.copy()
        # Note: the methodology behind this needs to be fixed as currently I just copied my cookies from the Handshake website... should be automated in the future as it will expire sometime
        headers2["Cookie"] = "production_submitted_email_address=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkltUnJZWFJvWldsdVFHRnVaSEpsZHk1amJYVXVaV1IxSWc9PSIsImV4cCI6IjIwNDQtMDUtMzBUMTk6Mjk6NDMuOTY4WiIsInB1ciI6bnVsbH19--5e3a14190ebccdbf869507dbeba7233b92785ce8; hss-global=eyJhbGciOiJkaXIiLCJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwidHlwIjoiSldUIn0..jtkoliUMrHwB_9GU393J1g.XaEOOsK2F8l-few0b7gc3ykmbPAe3SXmSCvWKcVPhNz_W2AhEr0Fi6rUF12IHEKNzgpQHxG57rBXa9CaqFUBZnNlVJ-I1t9BlpqtoW7rPlS0wtu_RLL6nQuV9oFyl56esKKxpIPACSRJLHdDuTYbOs6IZZ7V2DblRhrK_ObMQrv6-kdDJwKYDyf65fsntcxQXmzQPDqa_ss0q80-Xk9EqDRtU9p2RdGQntQbsC1BZzjFo0af4z1AwJkSWcGQdo7_a5EFES_TCxNOsGoIltxQurCfwlBWi_D1H15XjDtSEfH6T90T3wFn_T_8vxiwRgW0-5z6ywAnzo1DV07mXfLHkRxdaqmevpsZcLQ21nB2qjLl7lQ6D6s5qnXRGNr4vQTh.owQnLDj-uwzoE44n2vCHftYoPzcLJ6w-lXqIhmJNIdU; OptanonConsent=isGpcEnabled=0&datestamp=Wed+Jun+19+2024+13%3A48%3A29+GMT-0400+(Eastern+Daylight+Time)&version=202403.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=https%3A%2F%2Fjoinhandshake.com%2F&groups=C0001%3A1%2CC0003%3A1%2COSSTA_BG%3A1%2CC0002%3A1%2CC0004%3A1; production_js_on=true; production_49333931_incident-warning-banner-show=%5B%5D; _trajectory_session=R2NnN2g2dldDUmVFMDB5NEFRR1BaQmNoQmJ1RWl2RWx1WnNMRFF5RmR5cGlxK0JOaldnaVhsc0dMQjdKcUYwM1YzdnA1M2lFWExBQytrY0l5b2NwSFdNUTZ1TTVySndHVHNWVXhCbjhGajBDU2N3Y2t6WXd3K0tWaGNMTDF2M21jdmJnOXl1ci9QcjZwbC9ZaXR0bWc5QzlCSUtlRVU2OFFaRDdyK1JKWm5iQlIzMXV0YjVDKzZadzZmUnNsdWZOLS1rajUzMmg5WTN5bzViV2R6M0xHeUV3PT0%3D--7efb7071dc996025030eec868ffe1eb52d290231"
        r = s.post(link, data=payload, headers=headers2)
        events = r.json()["data"]["eventAbstractions"]["edges"]

        resources = []
        for event in events:
            name = event["node"]["name"]
            host = event["node"]["host"]["name"]
            categories = [c["name"] for c in event["node"]["categories"]]
            if event["node"]["medium"] == "IN_PERSON":
                location = "In Person"
            elif event["node"]["medium"] == "VIRTUAL":
                location = "Virtual"
            else:
                location = event["node"]["medium"]
            link = "https://app.joinhandshake.com/stu/events/" + event["node"]["id"]

            print(f"{name} | {location} | {link}")

            start_time = datetime.datetime.strptime(event["node"]["startDate"], '%Y-%m-%dT%H:%M:%S%z')
            end_time = datetime.datetime.strptime(event["node"]["endDate"], '%Y-%m-%dT%H:%M:%S%z')
            date = start_time.date()
            weekday = start_time.weekday() + 1
            events = [ResourceEvent(weekday, date, start_time.time(), end_time.time(), location)]

            resource = OtherResource("Career", "Handshake", name, host, events, categories)
            resources.append(resource)

        return resources
    
    def scrape_tartanconnect(self):
        link = "https://tartanconnect.cmu.edu/mobile_ws/v17/mobile_events_list?range=0&limit=300&filter4_contains=OR&filter4_notcontains=OR&order=undefined&search_word=&&1705612303189"
        s = requests.Session()

        headers2 = headers.copy()
        # Note: the methodology behind this needs to be fixed as currently I just copied my cookies from the TC website... should be automated in the future as it will expire sometime
        headers2["Cookie"] = "CG.SessionID=bjn3ntcbqtfiitbfh5chllv0-pzVxuA1cpH%2fOk2Jj%2bD7A16xB5k0%3d; cg_uid=4591962-vo5GAM/z8ygVxQGgQbnmEgpWA9VwxA4415xtDqjUwGE="
        r = s.get(link, headers=headers2)

        events = r.text.split('"listingSeparator":null')[1:]

        resources = []
        for event in events:
            name = event.split('"p3":"')[1].split('"')[0]
            host = event.split('"p9":"')[1].split('"')[0]
            categories = event.split('"p22":"')[1].split('"p23')[0].split('List all events filtered by ')[1:]
            categories = [c.split('\\"')[0].replace(" slash ", "/") for c in categories]
            
            loc = event.split('"p6":"')[1].split('"')[0].split('<div')[0]
            if loc == "-":
                location = "N/A"
            elif "Online" in loc:
                location = "Virtual"
            else:
                location = loc
            link = "https://tartanconnect.cmu.edu/rsvp?id=" + event.split('"p1":"')[1].split('"')[0]

            print(f"{name} | {location} | {link}")

            t = event.split('"p4":"')[1].split('"')[0].strip()
            t = t.replace("<p style='margin:0;'>", " ").replace("</p>", "").replace("&ndash;", "-").strip().split("M - ")
            if "," in t[1]:
                ##### multi day event not supported
                continue
                #start_time = datetime.datetime.strptime(t[0].strip() + "M", '%a, %b %d, %Y %I:%M %p')
                #end_time = datetime.datetime.strptime(t[1].strip(), '%a, %b %d, %Y %I:%M %p')
            else:
                t = t[0] + "M - " + t[1]
                date = " ".join(t.split(" ", 4)[:4])
                times = [st.strip() for st in t.split(" ", 4)[4].split("-")]
                for i in range(2):
                    if ":" not in times[i]:
                        times[i] = times[i].split(' ')[0] + ":00 " + times[i].split(' ')[1]
                start_time = datetime.datetime.strptime(date + " " + times[0], '%a, %b %d, %Y %I:%M %p')
                end_time = datetime.datetime.strptime(date + " " + times[1], '%a, %b %d, %Y %I:%M %p')
            
            date = start_time.date()
            weekday = start_time.weekday() + 1
            events = [ResourceEvent(weekday, date, start_time.time(), end_time.time(), location)]

            resource = OtherResource("Club/School", "TartanConnect", name, host, events, categories)
            resources.append(resource)

        return resources

bot = ScraperBot()
bot.run()



