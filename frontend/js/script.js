// Get courses from our Flask backend
async function loadCourses() {
    try {
        const response = await fetch("/api/courses");
        const courses = await response.json();

        const courseList = document.getElementById("course-list");
const courseCount = document.getElementById("course-count");

courseCount.textContent = `${courses.length} courses available`;

courseList.innerHTML = "";

courses.forEach(course => {
    const card = document.createElement("article");
    card.className = "course-card";
    const image = document.createElement("div");
image.className = "course-image";
image.textContent = "Course image";

    const title = document.createElement("h3");
    title.textContent = course.title;

    const level = document.createElement("span");
level.className = "course-level";
level.textContent = course.level;

    const duration = document.createElement("p");
    duration.textContent = `Duration: ${course.duration}`;

    card.append(image, title, level, duration);
    courseList.appendChild(card);
});
    } catch (error) {
        console.error("Could not load courses:", error);
    }
}

loadCourses();