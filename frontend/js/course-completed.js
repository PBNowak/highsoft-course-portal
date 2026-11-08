
document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("course_id");

    const courseTitle = document.getElementById("completed-course-title");

    if (!courseId) {
        courseTitle.textContent = "your course";
        return;
    }

    try {
        // Get course information
        const response = await fetch(`/api/courses/${courseId}`);

        if (!response.ok) {
            throw new Error("Could not load course");
        }

        const course = await response.json();
        courseTitle.textContent = course.title;
        document.getElementById("completion-time").textContent =
    course.duration || "—";

        // Get lessons for this course
        const lessonsResponse = await fetch(
            `/api/courses/${courseId}/lessons`
        );

        if (!lessonsResponse.ok) {
            throw new Error("Could not load lessons");
        }

        const lessons = await lessonsResponse.json();
        const lessonCount = lessons.length;

        // Get student progress
        const studentId = 1;

        const progressResponse = await fetch(
            `/api/students/${studentId}/progress`
        );

        if (!progressResponse.ok) {
            throw new Error("Could not load student progress");
        }

        const progress = await progressResponse.json();
       

        // Count completed lessons belonging to this course
        const completedLessonIds = progress.completed_lessons.map(
            item => Number(item.lesson_id)
        );

        const completedCount = lessons.filter(
            lesson => completedLessonIds.includes(Number(lesson.id))
        ).length;
        // Only show this page when all lessons are completed
if (lessonCount === 0 || completedCount < lessonCount) {
    window.location.replace(
        `course-detail.html?course_id=${courseId}`
    );
    return;
}

        // Display real progress
        document.getElementById("completed-lessons").textContent =
            `${completedCount}/${lessonCount}`;
            document.getElementById("completion-page").hidden = false;

    } catch (error) {
        console.error("Error loading completed course:", error);
    }
});
