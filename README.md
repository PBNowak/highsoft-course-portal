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
- Database: SQLite (implemented for course storage)
- Version Control: Git and GitHub

## Architecture and Data Flow

The application uses a frontend and backend architecture.

- **Frontend:** HTML and CSS provide the user interface, while JavaScript handles interactions and requests data from the backend.
- **Backend:** Python and Flask handle API requests and provide course information in JSON format.
- **Database:** SQLite is implemented for storing course information. Database support for lessons, enrolments, and learner progress is planned.

### Current Data Flow

1. The user opens the Course Overview page.
2. JavaScript sends a GET request to `/api/courses`.
3. Flask retrieves the course information from the SQLite database and returns it as JSON.
4. JavaScript receives the data and dynamically creates course cards.
5. The course cards and total number of available courses are displayed on the page.

Course information is now stored in SQLite rather than directly in the Flask application. The database currently contains nine sample courses, with additional database functionality planned for future development.

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
- `GET /api/courses/<int:course_id>` — returns the details of a specific course from SQLite using its ID.

The API can be tested at:

http://127.0.0.1:5000/api/courses

The frontend should be opened through Flask on port 5000 so that JavaScript requests to the API work correctly.


## Project Status

The project is currently in active development.

The frontend, Flask backend, and SQLite database have been implemented and successfully connected.

The Course Overview page retrieves nine sample courses from SQLite through the Flask API and displays them dynamically using JavaScript.

Live search, course filtering, sorting, course counts, and Load more functionality are implemented and tested.

The interface is being styled based on our high-fidelity Figma designs.

The Course Detail page is now implemented and connected to the Flask API and SQLite database. Users can open individual courses and return to the Course Overview page.

Future development will focus on lessons, enrolment, learner progress tracking, and basic administration functionality.

### Backend Development

- Python virtual environment created.
- Flask installed and configured.
- Basic Flask application created and tested successfully.
- First API endpoint (`/api/courses`) implemented.
- API returns example course data in JSON format.
- Backend dependencies saved in `backend/requirements.txt`.

### SQLite Database

The project now uses SQLite to store course information.

Database files:
- `backend/database.py` — database connection and setup functions.
- `backend/schema.sql` — defines the courses table.
- `backend/seed.sql` — contains nine sample courses.

To set up the database, run these commands from the project root:

```powershell
python -c "from backend.database import init_db; init_db()"
python -c "from backend.database import seed_db; seed_db()"
```

The database is stored locally in `backend/courses.db` and is excluded from GitHub using `.gitignore`.

The Flask `/api/courses` endpoint now retrieves course information from SQLite instead of a hardcoded Python list.


### Frontend Development

- Initial Course Overview page created using HTML and CSS.
- Navigation, course search field, and filter dropdowns added.
- Course card layout implemented based on the Figma design.
- JavaScript connected to the Flask API using fetch().
- Nine example courses retrieved from `/api/courses` and displayed dynamically.
- Course cards display titles, difficulty levels, durations, and descriptions.
- Course count updates automatically based on the returned data.
- Functional "Load more" button implemented: six courses appear initially, with three additional courses revealed when clicked.
- "View course" buttons are fully functional and open the correct Course Detail page using the selected course ID.
- Footer added with navigation links and project information.
- Live course search implemented using JavaScript, allowing users to search course titles and descriptions.
- Course sorting implemented using JavaScript, allowing users to switch between default course order and shortest duration first.
- Course count and Load more button update automatically based on search results.
- Search, sorting and Load more work together.
- Course Overview styling updated with Highsoft branding, improved navigation, difficulty badges and responsive course cards.
- Responsive styling and further UI improvements are in progress.

### Course Filtering

The Course Overview page includes functional filters for:

- Course level (Beginner, Intermediate, Advanced)
- Duration (1 hour or less, 1–3 hours, over 3 hours)
- Topic (Highcharts, JavaScript)
- Chart type (Line, Bar, Pie)

The filters work together with live search, course sorting, and the Load more button. The displayed course count updates automatically based on the selected filters.

The Flask API currently provides nine sample courses. Chart types are stored in the course data, with one Line chart course currently available. Bar and Pie chart courses have not yet been added. Topic filtering currently uses course titles and descriptions.

### Course Detail Page

- Users can click "View course" on the Course Overview page.
- Each course opens its own details using a course ID in the URL.
- Course information is retrieved dynamically from the Flask API and SQLite database.
- The Course Detail page displays the course title, level, duration, and description.
- Users can return to the Course Overview page using the "Back to courses" link.
- All nine sample courses have been tested successfully.

  
### Next Steps

- Complete the Course Overview page styling based on the Figma design.
- Create lesson pages and lesson content.
- Extend the SQLite database to support lessons, enrolments, and learner progress.
- Implement lesson completion and learner progress tracking.
- Use Highcharts to visualise learner progress.
- Explore basic admin functionality for managing courses.
- Continue improving accessibility and responsive design.