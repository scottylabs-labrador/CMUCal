
import requests
from monitors.base_scraper import BaseScraper
from models import OtherResource, ResourceEvent
import datetime
import json

class HandshakeScraper(BaseScraper):
    def __init__(self, db):
        super().__init__(db, "Handshake", "Handshake Website")
    
    def scrape(self):
        # This scraper needs to be improved to query above just the 30 most relevant. changing the limit=30 in handshake_req.txt doesn't seem to do anything...
        link = "https://app.joinhandshake.com/stu/graphql"
        s = requests.Session()
        r = s.get(link, headers=self.headers)

        with open("monitor_data/handshake_req.dat", "r") as f:
            payload = json.load(f)

        headers2 = self.headers.copy()
        # Note: the methodology behind this needs to be fixed as currently I just copied my cookies from the Handshake website... should be automated in the future as it will expire sometime
        headers2["Cookie"] = "iterableEndUserId=dkathein%40andrew.cmu.edu; production_submitted_email_address=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkltUnJZWFJvWldsdVFHRnVaSEpsZHk1amJYVXVaV1IxSWc9PSIsImV4cCI6IjIwNDQtMDktMDFUMTg6MjQ6MTAuMDE2WiIsInB1ciI6bnVsbH19--8b56d8cba5e3f8b246d820f8e195273b4b681439; hss-global=eyJhbGciOiJkaXIiLCJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwidHlwIjoiSldUIn0..FajFPo_Xn5387V_cikdL1Q.ELyWmMx0Rl7M3IeyRzUiyi6D3rVIBOmtvqbilrb-HOH2pMfOzxuqoZXdwt3jqv2I6NxVb4J2MxWX-7TNe2syWbxXOpMpUql3AM9XpSpUlxb6BvlVHvGw7BUrs_CD31DGSPvZSX-aJkvnapam519LcopqLaew9riooEU_jNWaAfNvQGKCHDDJKrpCYiHCFO4bx6YK4WW5NEpYvbMCBurqwhxwinDXRUF8ns7J0NGyi4ljKfibigJStj_PAHAwFQ6AHpNOjKmGy7kJs2JYbucA6Rjopu4QAaYJvmb5ucZHEeq-x2b8CsIWO9wyFK9iWI2IVg328iEpZNpYSFL8GF72O0bdmLK4nQoG-8V4gm3ZL7scBRrD1RjlKzsxfuZxepDg.xhW9NJuuYNZvmt3-hebicS2UBFJcJaam5Ho96SfgQno; ajs_anonymous_id=11f37480-3a38-46d2-9c70-7bd7b250e6bb; ajs_user_id=49333931; _gcl_au=1.1.157195141.1727285017; __pdst=20f704286bfa40d9b62d7c2e854ac939; _gd_visitor=49abb13c-bc3f-4279-836b-49faef9e0e80; _ga=GA1.1.1038936828.1699210960; _ga_4M16ZMP2G5=GS1.1.1727285018.1.1.1727285317.0.0.0; production_js_on=true; production_49333931_incident-warning-banner-show=%5B%5D; _dd_s=rum=2&id=272bad67-3d5d-4bf2-b599-133a11c041ed&created=1727651102628&expire=1727652044711; _trajectory_session=WlZ5ZEQxU3pwYzFkMkcyRGRLOGYweWhoUzA1N0NRZ1hBNEFQT3JTUk10dW5sY3JMRUJwOXFaSGhHdDAydFVGVTNkNXhpVHVUR2pOYm1tSjdncm5hVlJhWDVjUFpmWVAweXltSm04Zk9PenRLZjBCSU5xVlVMaFcybjdhemszVUkrZ2FWSEM1ckU0MmxjR2RIcFVmV0FSN25pbjFxS1lOT0ljZFdWZjNNZERVR0tLY0M3MTN4VW5aVVVCRnhqSk9va0cyMlpqcHFva25BWGwwemwwUkpONm1JRlQxTytoNGFrL1ZjSTB2S0VHVT0tLWthUTgzMVFHWnBseDJML3EyUElsVkE9PQ%3D%3D--43fa6762d2942bf5c108eb171c94d274a8227dcd"
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

            start_datetime = datetime.datetime.strptime(event["node"]["startDate"], '%Y-%m-%dT%H:%M:%S%z')
            end_datetime = datetime.datetime.strptime(event["node"]["endDate"], '%Y-%m-%dT%H:%M:%S%z')

            resource_event = ResourceEvent(
                start_datetime=start_datetime,
                end_datetime=end_datetime,
                location=location,
                recurrence=None  # No recurrence
            )

            # Create OtherResource
            resource = OtherResource(
                resource_type="Career",
                resource_source=self.resource_source,
                event_name=name,
                event_host=host,
                events=[resource_event],
                categories=categories
            )

            resources.append(resource)

        # Update the database
        unique_keys = ["resource_type", "resource_source", "event_name", "event_host"]
        self.update_database(resources, "career_club_events", unique_keys)
