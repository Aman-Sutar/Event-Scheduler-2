
---

```markdown
# 📅 Event Scheduler Web App

A modern, lightweight event scheduler built with **Flask** and **vanilla JavaScript**.  
Add, edit, delete, and view upcoming events in a beautiful UI with reminders and search functionality.  
✨ Styled with soft colors, rounded corners, and responsive design.

---

## 🚀 Features

- ➕ Add events with title, description, start and end time
- ✏️ Edit events using a sleek modal dialog
- 🗑️ Delete events instantly
- 🔍 Search events by title
- ⏰ View upcoming reminders (next 4 hours)
- 📆 12-hour formatted time display
- 🌐 Modern responsive UI

---

## 📂 Project Structure

📁 your-project/
│
├── app.py                 # Main Flask app
├── events.json            # Event storage (JSON)
│
├── static/
│   └── script.js          # Frontend JavaScript logic
│   └── styles.css         # Modern CSS styling
│
├── templates/
│   └── index.html         # Main HTML template (Jinja2)
│
└── README.md              # This file

```


## ⚙️ Installation

### 🔧 Requirements

- Python 3.8+
- Flask

### 📦 Setup Instructions

1. **Clone the repository**
   
   ```bash
   git clone https://github.com/Aman-Sutar/Event-Scheduler.git
   cd Event-Scheduler
  ``

2. **Install dependencies**

   ```bash
   pip install flask
   ```

3. **Run the app**

   ```bash
   python app.py
   ```

4. Open your browser and go to:
   👉 `http://127.0.0.1:5000`

---

## 🧪 Testing

You can test the API using tools like **Postman** or by interacting directly with the frontend UI.

---

## 📝 Notes

* Time inputs are automatically set to the current time and 4 hours later.
* Event reminders update live and show all events within the next 4 hours.
* All event times are shown in 12-hour format (e.g., `03:30 PM, Jun 29`).

---

## 💻 Screenshot

![image](https://github.com/user-attachments/assets/55faff9a-0e97-402f-a4d8-cafa7fb7ddf2)
