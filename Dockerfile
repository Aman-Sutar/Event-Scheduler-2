# Use the slim version of Python 3.9 as the base image
FROM python:3.9-slim

# Set the working directory to /app
WORKDIR /app

# Copy requirements.txt first to leverage Docker cache efficiently
COPY requirements.txt .

# Install dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files into the container
COPY . .

# Expose a port (if necessary for your app)
EXPOSE 5000

# Run the app (make sure the file exists and is named correctly)
CMD ["python", "app.py"]
