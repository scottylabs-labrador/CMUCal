
import json
from flask import Flask, jsonify, request, url_for, redirect
from flask_pymongo import PyMongo
import os
import configparser

config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join("config.ini")))

app = Flask(__name__)
app.config["MONGO_URI"] = config['PROD']['DB_URI']
mongo = PyMongo(app)

# Define the mapping between category and MongoDB collections
category_collections = {
    'academic': ['drop-in-tutoring', 'office-hours', 'peer-tutoring', 'supplemental-instruction'],
    'career': ['handshake'],
    'club': ['tartanconnect']
}

"""
# Create text indexes for the collections
def create_text_indexes():
    for category, collections in category_collections.items():
        for collection in collections:
            if category == 'academic':
                mongo.db[collection].create_index([('course_name', 'text')])
            else:
                mongo.db[collection].create_index([('event_name', 'text')])
create_text_indexes()
"""

@app.route('/events', methods=['POST'])
def search_events():
    data = request.json

    query = {}
    if 'category' in data and data['category'] in category_collections:
        collections = category_collections[data['category']]
    else:
        collections = sum(category_collections.values(), [])  # All collections
    
    if 'name' in data:
        query['$text'] = {
            '$search': data['name'],
            '$caseSensitive': False,
            '$diacriticSensitive': False
        }
    
    results = []
    for collection in collections:
        if 'startDate' in data or 'endDate' in data:
            date_query = {}
            if 'startDate' in data:
                date_query['events.start_time'] = {'$gte': data['startDate']}
            if 'endDate' in data:
                date_query['events.end_time'] = {'$lte': data['endDate']}
            query.update(date_query)

        print(f"Checking {collection}, query:")
        print(query)
        found_events = mongo.db[collection].find(query)
        for event in found_events:
            event['_id'] = str(event['_id'])
            results.append(event)

    return jsonify(results)

if __name__ == "__main__":
    app.run()