# Project Description
A digital course portal developed as part of the First Year Industry Project in collaboration with Highsoft.

## Project Goal
Our project focuses on creating a clear and supportive learning experience, from finding a suitable course to completing lessons and tracking progress.

## Project Structure
frontend/ – Frontend development
backend/ – Backend development
docs/ – Project documentation

## Tech Stack

- Frontend: HTML, CSS and JavaScript
- Backend: Python and Flask
- Database: SQLite (proposed)
- Version Control: Git and GitHub

## Architecture and Data Flow

The application uses a frontend and backend architecture.

- **Frontend:** HTML and CSS provide the user interface, while JavaScript handles interactions and requests data from the backend.
- **Backend:** Python and Flask handle API requests and provide course information in JSON format.
- **Database:** SQLite is planned for storing courses, lessons, and learner progress.

### Current Data Flow

1. The user opens the Course Overview page.
2. JavaScript sends a GET request to `/api/courses`.
3. Flask processes the request and returns example course data as JSON.
4. JavaScript receives the data and dynamically creates course cards.
5. The course cards and total number of available courses are displayed on the page.

Currently, the example course data is stored directly in the Flask application. In future development, this data will be stored in SQLite.

This separation allows the frontend to display course information without having to store the course content directly in the HTML.


## How to Run the Project Locally

### Requirements

- Python 3 installed
- Git installed
- A code editor such as Visual Studio Code

### Setup

1. Clone the GitHub repository and open the project folder.

2. Create a Python virtual environment:

   ```bash
   python -m venv .venv
   ```

3. Activate the virtual environment (Windows PowerShell):

   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```

4. Install the backend dependencies:

   ```bash
   pip install -r backend/requirements.txt
   ```

5. Start the Flask server from the project root:

   ```bash
   python backend/app.py
   ```

6. Open the Course Overview page in your browser:

   http://127.0.0.1:5000/courses.html

### API Endpoint

The backend currently provides:

- `GET /api/courses` — returns example course data in JSON format.

The API can be tested at:

http://127.0.0.1:5000/api/courses

The frontend should be opened through Flask on port 5000 so that JavaScript requests to the API work correctly.


## Project Status

The project is currently in active development.

The initial frontend structure and Flask backend have been implemented
and successfully connected.

The Course Overview page can now fetch example course data from the
Flask API and display course cards dynamically using JavaScript.

The page styling is being developed based on our high-fidelity
Figma designs. Additional functionality, including course search,
filtering, progress tracking, and database integration, is planned.

### Backend Development

- Python virtual environment created.
- Flask installed and configured.
- Basic Flask application created and tested successfully.
- First API endpoint (`/api/courses`) implemented.
- API returns example course data in JSON format.
- Backend dependencies saved in `backend/requirements.txt`.


### Frontend Development

- Initial Course Overview page created using HTML and CSS.
- Navigation, course search field, and filter dropdowns added.
- Course card layout implemented based on the Figma design.
- JavaScript connected to the Flask API using fetch().
- Nine example courses retrieved from `/api/courses` and displayed dynamically.
- Course cards display titles, difficulty levels, durations, and descriptions.
- Course count updates automatically based on the returned data.
- Functional "Load more" button implemented: six courses appear initially, with three additional courses revealed when clicked.
- "View course" buttons added as placeholders for future Course Detail pages.
- Footer added with navigation links and project information.
- Search and filtering functionality are not yet implemented.
- Responsive styling and further UI improvements are in progress.

  
### Next Steps

- Complete the Course Overview page styling based on the Figma design.
- Implement functional course search and filtering.
- Develop the Course Detail and Lesson pages.
- Set up the SQLite database to store course information.
- Implement lesson completion and learner progress tracking.
- Use Highcharts to visualise learner progress.
- Explore basic admin functionality for managing courses.
- Continue improving accessibility and responsive design.