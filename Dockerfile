# Step 1: Use a Python base image
FROM python:3.9-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Upgrade pip and install dependencies
RUN pip install --upgrade pip
RUN pip install -r Event-Scheduler/requirements.txt

# Step 4: Expose port 8000 to access the app
EXPOSE 8000

# Step 5: Set the command to run the app
CMD ["python", "Event-Scheduler/app.py"]
