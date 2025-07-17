# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Cloud Run injects the PORT environment variable.
# We don't need to set ENV PORT here, as Cloud Run will provide it.
# Just EXPOSE the expected port.
EXPOSE $PORT

# Run the Flask app using Gunicorn, binding to 0.0.0.0 and the PORT env var
# IMPORTANT: Changed to "shell" form (no square brackets) to allow $PORT expansion
CMD gunicorn --bind 0.0.0.0:$PORT app:app
