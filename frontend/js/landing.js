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

loadLandingPage();