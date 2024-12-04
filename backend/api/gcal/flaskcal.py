from flask import Flask, redirect, url_for, session, request, jsonify
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
import os

# Initialize Flask app
app = Flask(__name__)
app.secret_key = "your_secret_key"  # Replace with your own secret key

# OAuth2 Configuration
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"  # Allow HTTP for local dev
CLIENT_SECRETS_FILE = "credentials.json"  # Path to your credentials file
SCOPES = ["https://www.googleapis.com/auth/calendar"]

# Route to start the OAuth flow
@app.route("/")
def index():
    return "Welcome to CMUCal! <a href='/authorize'>Authorize with Google Calendar</a>"

# Route to handle OAuth authorization
@app.route("/authorize")
def authorize():
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri=url_for("oauth2callback", _external=True),
    )
    auth_url, state = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true",
    )
    session["state"] = state
    return redirect(auth_url)

# Callback route to handle the OAuth2 response
@app.route("/oauth2callback")
def oauth2callback():
    state = session["state"]
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        state=state,
        redirect_uri=url_for("oauth2callback", _external=True),
    )
    flow.fetch_token(authorization_response=request.url)
    credentials = flow.credentials
    session["credentials"] = credentials_to_dict(credentials)

    return redirect(url_for("add_calendar"))

# Route to add events to Google Calendar
@app.route("/add_calendar")
def add_calendar():
    if "credentials" not in session:
        return redirect("authorize")

    # Load credentials from session
    credentials = Credentials(**session["credentials"])
    service = build("calendar", "v3", credentials=credentials)

    # Create a new calendar (e.g., CMUCal)
    calendar = {
        "summary": "CMUCal",
        "timeZone": "America/New_York",
    }
    created_calendar = service.calendars().insert(body=calendar).execute()

    # Add an example event
    event = {
        "summary": "Example Event",
        "start": {
            "dateTime": "2024-12-10T10:00:00-05:00",
            "timeZone": "America/New_York",
        },
        "end": {
            "dateTime": "2024-12-10T11:00:00-05:00",
            "timeZone": "America/New_York",
        },
    }
    service.events().insert(calendarId=created_calendar["id"], body=event).execute()

    return jsonify({"message": "Calendar and event added successfully!"})

# Helper function to convert credentials to a dict
def credentials_to_dict(credentials):
    return {
        "token": credentials.token,
        "refresh_token": credentials.refresh_token,
        "token_uri": credentials.token_uri,
        "client_id": credentials.client_id,
        "client_secret": credentials.client_secret,
        "scopes": credentials.scopes,
    }

if __name__ == "__main__":
    app.run("localhost", 5000, debug=True)
