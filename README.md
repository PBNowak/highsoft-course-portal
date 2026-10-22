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
- **Database:** SQLite stores courses, lessons, fictional demo students, consent preferences, and completed lessons. Each lesson is linked to a course using a course ID. Student progress is saved only when consent has been given. Enrolment functionality is planned for future development.

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
- `GET /api/courses/<int:course_id>/lessons` — returns all lessons belonging to a specific course from SQLite in JSON format.

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

Future development will focus on connecting the Lesson page to the Flask API, implementing the student-facing progress interface, adding course enrolment functionality, and developing the admin dashboard. The shared backend APIs for student consent and lesson completions are already implemented and tested.

### Backend Development

- Python virtual environment created.
- Flask installed and configured.
- Basic Flask application created and tested successfully.
- First API endpoint (`/api/courses`) implemented.
- API returns example course data in JSON format.
- Backend dependencies saved in `backend/requirements.txt`.

### SQLite Database

The project uses SQLite to store courses, lessons, fictional demo students, progress consent, and lesson completions.

Database files:
- `backend/database.py` — database connection and setup functions.
- `backend/schema.sql` — defines the courses, lessons, students, progress_consents, and lesson_completions tables.
- `backend/seed.sql` — contains nine sample courses and five sample lessons for Introduction to Highcharts.

To set up the database, run these commands from the project root:

```powershell
python -c "from backend.database import init_db; init_db()"
python -c "from backend.database import seed_db; seed_db()"
```
**Note for collaborators:** After pulling updates that change `schema.sql` or `seed.sql`, run both database setup commands again. This creates any new tables and inserts new sample data without duplicating existing records.

The SQLite database file is stored locally and is not shared through GitHub. Each developer must update their own database.

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
- The page includes sections for learning outcomes, course information, and course content.
- Lessons are retrieved dynamically from SQLite through the Flask API.
- The first course, Introduction to Highcharts, currently contains five sample lessons.
- Lesson titles and durations are displayed in a numbered list.
- The lesson count updates automatically based on the selected course.
- Courses without lessons display a "Lessons coming soon" message.
- The Start course button is present but remains disabled until lesson navigation is implemented.

 ### Lesson Page

- A new `frontend/lesson.html` page has been created based on the low-fidelity wireframe.
- The basic HTML structure includes lesson navigation, a progress indicator, lesson content, a chart example area, a practice section, and help.
- Previous and Next buttons are included but currently disabled.
- The page is not yet connected to the Flask API or SQLite database.
- Dynamic lesson content, interactive exercises, and progress tracking will be implemented in future development.
  
  ### Student Progress and Consent System

The backend now includes a basic student progress tracking system using Flask and SQLite.

**Database tables:**
- `students` — stores fictional demo student information.
- `progress_consents` — records whether a student has agreed to progress storage.
- `lesson_completions` — stores completed lessons and completion timestamps.

Four fictional demo students have been added: Kari, Emma, Jonas, and Sofie. Kari (student ID 1) is used for testing the student experience.

**New API endpoints:**
- `GET /api/students` — returns the demo students.
- `GET /api/students/<int:student_id>/consent` — retrieves a student's consent status.
- `POST /api/students/<int:student_id>/consent` — gives or withdraws consent.
- `POST /api/students/<int:student_id>/lessons/<int:lesson_id>/complete` — records a completed lesson when consent has been given.
- `GET /api/students/<int:student_id>/progress` — retrieves saved lesson completions and consent status.

**Consent and privacy:**
- Lesson completions cannot be saved without consent.
- Withdrawing consent automatically deletes previously stored lesson completions.
- Duplicate lesson completions are prevented.
- Consent and lesson-completion functionality have been tested successfully using the Flask API and SQLite.
- The system currently uses fictional demo students without authentication. It is intended for demonstration purposes only and is not suitable for storing real student information without additional security and privacy measures.

The backend functionality is implemented, but the student-facing progress interface and admin dashboard integration are still in development.

## Student Lesson Page

The student lesson page is now connected to the Flask API and SQLite database.

Implemented features:
- Dynamic lesson titles and content
- Lesson sidebar with clickable navigation
- Previous and Next lesson buttons
- Current lesson number
- Student consent preferences for progress tracking
- Saving lesson completion to SQLite
- Recognising previously completed lessons
- Course progress bar with percentage
- Completion checkmarks in the lesson sidebar

The current implementation uses demo student Kari (ID 1).

Progress is only saved when the student has given consent.

The lesson page is still under development. Chart examples, practice activities, contextual help, and final styling will be added later.

### Navigation and UI Improvements

- Added consistent navigation bars and footers to the Course Detail and Lesson pages.
- Applied IBM Plex Sans across all three course pages.
- Improved the responsive lesson layout with a sidebar.
- Styled lesson navigation, consent, completion, and Previous/Next buttons.
- Added visual indicators for completed and currently selected lessons.
- Connected the complete learning flow:
  Courses → Course Details → Start Course → Lesson.
- Fixed course ID parameters so course details load correctly.
- Added navigation from lessons back to their course details.
- The Start course button is enabled only when lessons are available.
   
### Next Steps

- Complete the Course Overview and Course Detail page styling based on the Figma designs.
- Connect the Lesson page to the Flask API and SQLite database.
- Display dynamic lesson content and implement Previous/Next lesson navigation.
- Add learning outcomes and prerequisites for individual courses.
- Develop interactive lesson exercises and chart examples using Highcharts.
- Add database support for course enrolments.
- Connect the student-facing lesson completion and progress tracking interface to the existing Flask API.
- Integrate student progress data into the admin dashboard.
- Use Highcharts to visualise learner progress.
- Explore basic admin functionality for managing courses.
- Continue improving accessibility and responsive design.