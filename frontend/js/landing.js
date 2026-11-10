// AI-assisted (Claude): built with help from Claude, based on our Figma design and requirements. Tested, debugged and adjusted by Amanda.
// ============================================================
// LANDING PAGE
// Fetches courses from the API and shows them on the front page.
// The course card is built the same way as in script.js
// (course overview page), so the cards look the same.
// ============================================================


// --- Build one course card ---
// Takes one course object from the API and returns a finished card element.
function createCourseCard(course) {
    const card = document.createElement("article");
    card.className = "course-card";

    const image = document.createElement("div");
    image.className = "course-image";
    image.textContent = "Course image";

    // Level badge + duration on one row
    const level = document.createElement("span");
    level.className = `course-level level-${course.level.toLowerCase()}`;
    level.textContent = course.level;

    const duration = document.createElement("p");
    duration.className = "course-duration";
    duration.textContent = `~ ${course.duration}`;

    const meta = document.createElement("div");
    meta.className = "course-meta";
    meta.append(level, duration);

    const title = document.createElement("h3");
    title.textContent = course.title;

    const description = document.createElement("p");
    description.className = "course-description";
    description.textContent = course.description;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "course-button";
    button.textContent = "View course";
    button.addEventListener("click", () => {
        window.location.href = `course-detail.html?course_id=${course.id}`;
    });

    card.append(image, meta, title, description, button);
    return card;
}


// --- Show a list of courses inside a container ---
// Empties the container first, then adds one card per course.
function showCourses(courses, container) {
    container.innerHTML = "";

    courses.forEach(course => {
        container.appendChild(createCourseCard(course));
    });
}


// --- Start: fetch courses and fill "Explore this week's courses" ---
async function loadLandingPage() {
    try {
        const response = await fetch("/api/courses");

        if (!response.ok) {
            throw new Error("Could not fetch courses");
        }

        const courses = await response.json();

        // slice(0, 3) = take the first three courses only
        const weekList = document.getElementById("landing-week-list");
        showCourses(courses.slice(0, 3), weekList);
        
        // Search needs the full course list
        setUpSearch(courses);

    } catch (error) {
        console.error("Could not load landing page:", error);
    }
}



// --- Search and filters ---
// Filtering logic reused from script.js (course overview page).
function filterCourses(courses) {
    const searchText = document.getElementById("landing-search").value.toLowerCase().trim();
    const level = document.getElementById("landing-level").value;
    const chartType = document.getElementById("landing-chart-type").value;
    const durationFilter = document.getElementById("landing-duration").value;

    return courses.filter(course => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchText) ||
            course.description.toLowerCase().includes(searchText);

        const matchesLevel = level === "" || course.level.toLowerCase() === level;

        const matchesChartType = chartType === "" || course.chart_type === chartType;

        // Duration is stored as text like "2 hours", parseFloat reads the number
        const hours = parseFloat(course.duration);
        const matchesDuration =
            durationFilter === "" ||
            (durationFilter === "short" && hours <= 1) ||
            (durationFilter === "medium" && hours >= 1 && hours <= 3) ||
            (durationFilter === "long" && hours > 3);

        return matchesSearch && matchesLevel && matchesChartType && matchesDuration;
    });
}


// Show up to three matching courses in the results panel
function showSearchResults(courses) {
    const panel = document.getElementById("landing-results");
    const list = document.getElementById("landing-results-list");

    const matches = filterCourses(courses);

    if (matches.length === 0) {
        list.innerHTML = "<p>No courses match your search. Try another word or filter.</p>";
    } else {
        showCourses(matches.slice(0, 3), list);
    }

    panel.hidden = false;
}


// Hide the panel and reset search and filters
function closeSearchResults() {
    document.getElementById("landing-results").hidden = true;
    document.getElementById("landing-search").value = "";
    document.getElementById("landing-level").value = "";
    document.getElementById("landing-chart-type").value = "";
    document.getElementById("landing-duration").value = "";
}


// Connect buttons, Enter key and filters to the search
function setUpSearch(courses) {
    document.getElementById("landing-search-btn")
        .addEventListener("click", () => showSearchResults(courses));

    // Pressing Enter in the search field also searches
    document.getElementById("landing-search")
        .addEventListener("keydown", event => {
            if (event.key === "Enter") {
                showSearchResults(courses);
            }
        });

    // Changing a filter searches right away
    ["landing-level", "landing-chart-type", "landing-duration"].forEach(id => {
        document.getElementById(id)
            .addEventListener("change", () => showSearchResults(courses));
    });

    document.getElementById("landing-results-close")
        .addEventListener("click", closeSearchResults);
}



// --- Continue where you left off ---
// Kari (student 1) is our demo student, the same as on the profile page.
const DEMO_STUDENT_ID = 1;

// Build one "continue" card: title, progress bar and a Continue link
function createContinueCard(course) {
    const card = document.createElement("article");
    card.className = "continue-card";

    const title = document.createElement("h3");
    title.textContent = course.title;

    const status = document.createElement("p");
    status.className = "continue-status";
    status.textContent = `In progress · ${course.progress_percent}%`;

    // Progress bar: same classes as the students table in the admin page
    const bar = document.createElement("div");
    bar.className = "progress-bar";
    bar.setAttribute("aria-hidden", "true");   // the text above says the same for screen readers

    const fill = document.createElement("div");
    fill.className = "progress-fill";
    fill.style.width = `${course.progress_percent}%`;
    bar.appendChild(fill);

    const lessons = document.createElement("p");
    lessons.className = "continue-lessons";
    lessons.textContent = `${course.completed_lessons} of ${course.total_lessons} lessons`;

    // A link, because it takes you to another page
    const link = document.createElement("a");
    link.className = "course-button";
    link.href = `course-detail.html?course_id=${course.course_id}`;
    link.textContent = "Continue";

    card.append(title, status, bar, lessons, link);
    return card;
}


// Show Kari's courses if she has progress, otherwise the "New to Highcharts?" section
async function loadContinueSection() {
    const continueSection = document.getElementById("landing-continue");
    const newUserSection = document.getElementById("landing-new-user");
    const list = document.getElementById("landing-continue-list");

        // Demo logged out: keep showing "New to Highcharts?" instead of Kari's courses
    if (localStorage.getItem("demoLoggedOut") === "true") {
        return;
    }

    try {
        const response = await fetch(`/api/students/${DEMO_STUDENT_ID}/courses`);

        if (!response.ok) {
            throw new Error("Could not fetch student progress");
        }

        const data = await response.json();

        // Only courses that are not finished yet
        const inProgress = data.courses.filter(course => course.progress_percent < 100);

        if (inProgress.length === 0) {
            // No progress (or no consent): keep showing "New to Highcharts?"
            return;
        }

        list.innerHTML = "";
        inProgress.forEach(course => {
            list.appendChild(createContinueCard(course));
        });

        continueSection.hidden = false;
        newUserSection.hidden = true;

    } catch (error) {
        // If something goes wrong, the page still shows "New to Highcharts?"
        console.error("Could not load continue section:", error);
    }
}

loadLandingPage();
loadContinueSection();