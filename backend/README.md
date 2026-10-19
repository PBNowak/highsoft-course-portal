# Backend — Highsoft Course Portal

## Description

The backend will handle the application logic, data management, and communication with the database.

It will support course information, lesson content, and student progress tracking.

## Technologies

- Python — backend programming language
- Flask — web framework for handling requests and APIs
- SQLite — proposed database for storing application data

## Frontend Connection

The backend will provide API endpoints that the frontend can access using JavaScript.

Data will be exchanged in JSON format.

## Planned Functionality

- Retrieve available courses
- Retrieve course and lesson information
- Store and update student progress
- Support basic course management

## Project Status

Backend development has not started yet.
Setup and running instructions will be added as development progresses.


## Running the Backend

The backend is built using Python and Flask.

### Installation

Create and activate a Python virtual environment.

Install the required packages:

    python -m pip install -r backend/requirements.txt

### Starting the Server

From the project root directory, run:

    python backend/app.py

The Flask development server runs at:

    http://127.0.0.1:5000

### Available API Endpoints

- `GET /` — Returns a message confirming the API is running.
- `GET /api/courses` — Returns example course data in JSON format.

### Current Status

The Flask application and courses API are working.

Course data is currently stored directly in Python. SQLite database integration and frontend connectivity are planned next.