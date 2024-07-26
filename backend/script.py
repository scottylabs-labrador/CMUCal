from flask import Flask, jsonify, redirect, url_for
import os
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import datetime
from googleapiclient.discovery import build
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

SCOPES = ['https://www.googleapis.com/auth/calendar']

@app.route('/login')
def login():
    """Logs the user in and returns the credentials."""
    creds = None

    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=8080)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    
    return redirect(url_for('read_calendar_events'))

@app.route('/events')
def read_calendar_events():
    """Reads and returns the user's upcoming calendar events."""
    if not os.path.exists('token.json'):
        return redirect(url_for('login'))

    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    service = build('calendar', 'v3', credentials=creds)
    now = datetime.datetime.utcnow().isoformat() + 'Z'
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                          maxResults=10, singleEvents=True,
                                          orderBy='startTime').execute()
    events = events_result.get('items', [])
    
    events_list = [{'start': event['start'].get('dateTime', event['start'].get('date')),
                    'title': event['summary']} for event in events]

    return jsonify(events_list)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
