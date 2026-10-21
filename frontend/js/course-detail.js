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
document.getElementById("course-description").textContent = course.description;

    } catch (error) {
        console.error("Could not load course:", error);
    }
}

loadCourseDetails();