
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
        # Seems like hss-global is the cookie necessary.
        headers2["Cookie"] = "hss-global=eyJhbGciOiJkaXIiLCJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwidHlwIjoiSldUIn0..bHIgNZv3jsNgQkpKsfGzBg.CTez0ZThu_xLFzBW7Gqy0c9aFFTaBeXvQ5uX4B2MIho1POqDpg-htO-C8942CCy1fziU3y-_xoD8D8SJMZZVsvk-gB2gDgSpMUwV-1ublTJooGrN52hOEn1fxDu7-GHT5NHMDiY89Pj3-n11gA46h10cfHgedTbgZc8Mmgc7sDwOx31FKLxmi12Y-kpTac8IFVoJQGlEzUKZMTjKR85VUQRxkSk4aAumUvbrFmMIh25ktgJKakf-7xHdhp510fJUndn3LyPl8KutkZdHa-bkKgDuKMGlhlEDjnXttJaWaYQvxZ2RjcLPev48dIAM6cFhXmKW0DMvZ_JuiBe0xN-b0n_xY778xcSFd0sQJH96yQ3TZPwBV0exM8c4TvPxPBan.l_nH4905VStUqbvyna-OjB77Uu52Immf07LBrMhjAnA"
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
