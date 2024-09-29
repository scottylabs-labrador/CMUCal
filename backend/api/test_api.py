import requests

# URL of the Flask application's `/events` endpoint
url = 'http://localhost:5000/events'

# Example payload for the POST request
payload = {
    'name': 'Business',
    'category': 'academic',
    #'startDate': '10:00AM',
    #'endDate': '02:00PM'
}

print("Calling API with payload:")
print(payload)

# Make the POST request
response = requests.post(url, json=payload)

# Print the status code and response data
print(f'Status Code: {response.status_code}')
print('Response:')
print(response.json())