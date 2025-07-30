from flask import Flask, request, render_template, jsonify, redirect
import json
from datetime import datetime, timedelta
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes (for front-end testing on a different port/domain)
DATA_FILE = 'events.json'

def load_events():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_events(events):
    with open(DATA_FILE, 'w') as f:
        json.dump(events, f, indent=2)

def get_upcoming_reminders(events):
    now = datetime.now()
    end = now + timedelta(hours=4)
    upcoming = []

    for e in events:
        start = datetime.fromisoformat(e['start_time'])
        if now <= start < end:
            upcoming.append(e)

    return upcoming

@app.route('/')
def index():
    all_events = load_events()
    reminders = get_upcoming_reminders(all_events)

    search_query = request.args.get('search', '').lower()
    if search_query:
        events = [e for e in all_events if search_query in e['title'].lower()]
    else:
        events = all_events

    return render_template('index.html', events=events, reminders=reminders, search=search_query)

# Get all events
@app.route('/events', methods=['GET', 'POST'])
@app.route('/events/', methods=['GET', 'POST'])  # For routes with trailing slash
def events():
    if request.method == 'GET':
        events = load_events()
        return jsonify(events)
    elif request.method == 'POST':
        events = load_events()
        data = request.get_json()
        new_event = {
            'id': str(len(events) + 1),
            'title': data['title'],
            'description': data.get('description', ''),
            'start_time': data['start_time'],
            'end_time': data['end_time'],
        }
        events.append(new_event)
        save_events(events)
        return jsonify(new_event), 201

# Update an existing event
@app.route('/events/<event_id>', methods=['PUT'])
def update_event(event_id):
    events = load_events()
    data = request.get_json()
    for event in events:
        if event['id'] == event_id:
            event.update(data)
            save_events(events)
            return jsonify(event)
    return jsonify({'error': 'Event not found'}), 404

# Delete an event
@app.route('/events/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    events = load_events()
    events = [e for e in events if e['id'] != event_id]
    save_events(events)
    return '', 204

# Custom template filter for formatting time (12-hour clock)
@app.template_filter('format12')
def format12(value):
    dt = datetime.fromisoformat(value)
    return dt.strftime('%I:%M %p, %b %d')

if __name__ == "__main__":
    # Make sure it listens on 0.0.0.0 (the container's network interface)
    app.run(host="0.0.0.0", port=5000)
