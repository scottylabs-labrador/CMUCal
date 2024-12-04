from flask import Flask, request, jsonify, session
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

# Route to start the OAuth flow (frontend will redirect user here)
@app.route("/api/authorize", methods=["GET"])
def authorize():
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri=request.args.get("redirect_uri"),  # Frontend provides redirect URI
    )
    auth_url, state = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true",
    )
    session["state"] = state
    return jsonify({"auth_url": auth_url})


# Callback route to handle the OAuth2 response
@app.route("/api/oauth2callback", methods=["POST"])
def oauth2callback():
    redirect_uri = request.json.get("redirect_uri")
    state = session.get("state")
    if not state:
        return jsonify({"error": "Invalid state"}), 400

    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        state=state,
        redirect_uri=redirect_uri,
    )
    flow.fetch_token(authorization_response=request.json.get("authorization_response"))
    credentials = flow.credentials
    session["credentials"] = credentials_to_dict(credentials)
    return jsonify({"message": "Authorization successful!"})


# Route to add a new calendar
@app.route("/api/add_calendar", methods=["POST"])
def add_calendar():
    if "credentials" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    # Load credentials from session
    credentials = Credentials(**session["credentials"])
    service = build("calendar", "v3", credentials=credentials)

    # Create a new calendar
    calendar_data = request.json
    calendar = {
        "summary": calendar_data.get("summary", "CMUCal"),
        "timeZone": calendar_data.get("timeZone", "America/New_York"),
    }
    created_calendar = service.calendars().insert(body=calendar).execute()

    return jsonify({"calendar_id": created_calendar["id"], "message": "Calendar created successfully!"})


# Route to add an event to a calendar
@app.route("/api/add_event", methods=["POST"])
def add_event():
    if "credentials" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    # Load credentials from session
    credentials = Credentials(**session["credentials"])
    service = build("calendar", "v3", credentials=credentials)

    # Add an event to the calendar
    event_data = request.json
    event = {
        "summary": event_data.get("summary"),
        "start": {
            "dateTime": event_data["start_dateTime"],
            "timeZone": event_data.get("timeZone", "America/New_York"),
        },
        "end": {
            "dateTime": event_data["end_dateTime"],
            "timeZone": event_data.get("timeZone", "America/New_York"),
        },
    }
    service.events().insert(calendarId=event_data["calendar_id"], body=event).execute()

    return jsonify({"message": "Event added successfully!"})


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
