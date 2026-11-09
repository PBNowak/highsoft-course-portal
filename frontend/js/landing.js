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

    } catch (error) {
        console.error("Could not load landing page:", error);
    }
}

loadLandingPage();