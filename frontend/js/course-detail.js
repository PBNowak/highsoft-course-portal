// Get the course ID from the page URL
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get("course_id");
const studentId = 1; // Kari, our demo student

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
document.getElementById("course-summary").textContent = course.description;
document.getElementById("course-level").textContent = course.level;
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
const startCourseButton = document.getElementById("start-course-btn");
const consentCheckbox = document.getElementById("course-consent");
const consentMessage = document.getElementById("course-consent-message");
// Load Kari's saved consent preference
try {
    const response = await fetch(`/api/students/${studentId}/consent`);

    if (!response.ok) {
        throw new Error("Could not load consent");
    }

    const data = await response.json();
    consentCheckbox.checked = data.consent_given;

    startCourseButton.disabled =
        !data.consent_given || lessons.length === 0;

} catch (error) {
    console.error("Consent loading error:", error);
    startCourseButton.disabled = true;
    consentMessage.textContent = "Unable to load your saved preference.";
}

consentCheckbox.addEventListener("change", async () => {
    startCourseButton.disabled = true;
    consentMessage.textContent = "Saving your preference...";

    try {
        const response = await fetch(
            `/api/students/${studentId}/consent`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    consent_given: consentCheckbox.checked
                })
            }
        );

        if (!response.ok) {
            throw new Error("Could not save consent");
        }

        consentMessage.textContent = "Your preference has been saved.";
        startCourseButton.disabled = !consentCheckbox.checked || lessons.length === 0;

    } catch (error) {
        console.error("Consent error:", error);
        consentMessage.textContent = "Unable to save your preference.";
    }
});

if (lessons.length > 0) {
    startCourseButton.disabled =
    !document.getElementById("course-consent").checked;

    startCourseButton.addEventListener("click", () => {
        const firstLesson = lessons[0];

        window.location.href =
            `lesson.html?course_id=${courseId}&lesson_id=${firstLesson.id}`;
    });
}
        const lessonList = document.getElementById("lesson-list");
lessonList.innerHTML = "";

lessons.forEach((lesson, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <span>${index + 1}. ${lesson.title}</span>
    <span>${lesson.duration}</span>
`;
    lessonList.appendChild(listItem);
});

    } catch (error) {
        console.error("Error loading lessons:", error);
    }
}
loadCourseLessons();