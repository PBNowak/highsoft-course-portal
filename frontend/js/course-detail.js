// Get the course ID from the page URL
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get("id");

console.log("Selected course ID:", courseId);



// Fetch the selected course from the Flask API
async function loadCourseDetails() {
    try {
        const response = await fetch(`/api/courses/${courseId}`);

        if (!response.ok) {
            throw new Error("Course not found");
        }

        const course = await response.json();

        console.log("Course loaded:", course);
        // Display the course information on the page
document.getElementById("course-title").textContent = course.title;
document.getElementById("course-level").textContent = `Level: ${course.level}`;
document.getElementById("course-duration").textContent = `Duration: ${course.duration}`;
document.getElementById("course-about-text").textContent = course.description;

    } catch (error) {
        console.error("Could not load course:", error);
    }
}

loadCourseDetails();
async function loadCourseLessons() {
    try {
        const response = await fetch(`/api/courses/${courseId}/lessons`);

        if (!response.ok) {
            throw new Error("Could not load lessons");
        }

        const lessons = await response.json();

        console.log("Lessons loaded:", lessons);
        document.getElementById("course-lesson-count").textContent =
    `${lessons.length} lessons`;
        const lessonsStatus = document.getElementById("lessons-status");

if (lessons.length > 0) {
    lessonsStatus.hidden = true;
}
        const lessonList = document.getElementById("lesson-list");
lessonList.innerHTML = "";

lessons.forEach(lesson => {
    const listItem = document.createElement("li");
    listItem.textContent = `${lesson.title} — ${lesson.duration}`;
    lessonList.appendChild(listItem);
});

    } catch (error) {
        console.error("Error loading lessons:", error);
    }
}
loadCourseLessons();