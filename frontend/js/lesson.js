document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);

    const courseId = params.get("course_id");
    const lessonId = params.get("lesson_id");
    const studentId = 1; // Kari, our demo student
    let completedLessonIds = [];

const consentCheckbox = document.getElementById("progress-consent-checkbox");
const saveConsentButton = document.getElementById("save-consent");
const consentMessage = document.getElementById("consent-message");
const completeLessonButton = document.getElementById("complete-lesson");
const completionMessage = document.getElementById("completion-message");


completeLessonButton.addEventListener("click", async () => {
    completeLessonButton.disabled = true;

    try {
        const response = await fetch(
            `/api/students/${studentId}/lessons/${lessonId}/complete`,
            {
                method: "POST"
            }
        );

        if (response.status === 403) {
            completionMessage.textContent =
                "Please enable progress tracking and save your preference first.";
            return;
        }

        if (!response.ok) {
            throw new Error("Could not save lesson completion");
        }

        completionMessage.textContent =
            "Lesson completed! Your progress has been saved.";
            const progressResponse = await fetch(
    `/api/students/${studentId}/progress`
);

if (!progressResponse.ok) {
    throw new Error("Could not refresh progress");
}

const updatedProgress = await progressResponse.json();

const updatedCompletedIds = updatedProgress.completed_lessons.map(
    item => Number(item.lesson_id)
);

const courseLessons = await fetch(
    `/api/courses/${courseId}/lessons`
).then(response => {
    if (!response.ok) {
        throw new Error("Could not refresh course lessons");
    }
    return response.json();
});

const completedCount = courseLessons.filter(
    item => updatedCompletedIds.includes(Number(item.id))
).length;

const updatedPercent = courseLessons.length > 0
    ? Math.round((completedCount / courseLessons.length) * 100)
    : 0;

document.getElementById("lesson-progress").value = updatedPercent;

document.getElementById("lesson-progress").setAttribute(
    "aria-label",
    `Course progress: ${updatedPercent}%`
);

document.getElementById("progress-percentage").textContent =
    `${updatedPercent}%`;

    } catch (error) {
        console.error("Completion error:", error);
        completionMessage.textContent =
            "Unable to save lesson completion.";
    } finally {
        completeLessonButton.disabled = false;
    }
});
saveConsentButton.addEventListener("click", async () => {
    saveConsentButton.disabled = true;

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

        consentMessage.textContent = consentCheckbox.checked
            ? "Your preference has been saved. Progress tracking is enabled."
            : "Your preference has been saved. Progress tracking is disabled.";

    } catch (error) {
        console.error("Consent saving error:", error);
        consentMessage.textContent = "Unable to save your preference.";
    } finally {
        saveConsentButton.disabled = false;
    }
});
try {
    const consentResponse = await fetch(
        `/api/students/${studentId}/consent`
    );

    if (!consentResponse.ok) {
        throw new Error("Could not load consent preference");
    }

    const consentData = await consentResponse.json();

    consentCheckbox.checked = consentData.consent_given;

    console.log("Saved consent:", consentData);

} catch (error) {
    console.error("Consent error:", error);
    consentMessage.textContent =
        "Unable to load your saved consent preference.";
}

    if (!courseId || !lessonId) {
        document.getElementById("lesson-title").textContent =
            "Lesson not found";
        return;
    }

    try {
        const response = await fetch(`/api/courses/${courseId}/lessons`);

        if (!response.ok) {
            throw new Error("Failed to load lessons");
        }

        const lessons = await response.json();

        console.log("Lessons from database:", lessons);
        try {
    const progressResponse = await fetch(
        `/api/students/${studentId}/progress`
    );

    if (!progressResponse.ok) {
        throw new Error("Could not load progress");
    }

    const progressData = await progressResponse.json();

    console.log("Saved lesson progress:", progressData);
    completedLessonIds = progressData.completed_lessons.map(
    item => Number(item.lesson_id)
);
const lessonProgressBar = document.getElementById("lesson-progress");

const courseLessonIds = lessons.map(item => Number(item.id));

const completedInCourse = courseLessonIds.filter(
    id => completedLessonIds.includes(id)
).length;

const progressPercent = lessons.length > 0
    ? Math.round((completedInCourse / lessons.length) * 100)
    : 0;

lessonProgressBar.value = progressPercent;
document.getElementById("progress-percentage").textContent =
    `${progressPercent}%`;

lessonProgressBar.setAttribute(
    "aria-label",
    `Course progress: ${progressPercent}%`
);

console.log("Course progress:", progressPercent + "%");

if (completedLessonIds.includes(Number(lessonId))) {
    completionMessage.textContent =
        "You have already completed this lesson!";

    completeLessonButton.disabled = true;
}


} catch (error) {
    console.error("Progress loading error:", error);
}
        const lesson = lessons.find(
    item => item.id === Number(lessonId)
);

if (!lesson) {
    document.getElementById("lesson-title").textContent =
        "Lesson not found";
    return;
}

document.getElementById("lesson-title").textContent = lesson.title;
document.getElementById("lesson-text").textContent = lesson.content;
const currentLessonIndex = lessons.findIndex(
    item => item.id === Number(lessonId)
);

document.getElementById("lesson-number").textContent =
    `Lesson ${currentLessonIndex + 1} of ${lessons.length}`;
    const nextButton = document.getElementById("next-lesson");

if (currentLessonIndex < lessons.length - 1) {
    nextButton.disabled = false;

    nextButton.addEventListener("click", () => {
        const nextLesson = lessons[currentLessonIndex + 1];

        window.location.href =
            `lesson.html?course_id=${courseId}&lesson_id=${nextLesson.id}`;
    });
}
const previousButton = document.getElementById("previous-lesson");

if (currentLessonIndex > 0) {
    previousButton.disabled = false;

    previousButton.addEventListener("click", () => {
        const previousLesson = lessons[currentLessonIndex - 1];

        window.location.href =
            `lesson.html?course_id=${courseId}&lesson_id=${previousLesson.id}`;
    });
}
const lessonNavigation = document.getElementById("lesson-navigation");

console.log("Completed IDs for sidebar:", completedLessonIds);
lessons.forEach((item, index) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.href = `lesson.html?course_id=${courseId}&lesson_id=${item.id}`;
    link.textContent = item.title;
    if (completedLessonIds.includes(Number(item.id))) {
    link.textContent += " ✓";
    link.classList.add("completed");
}

    if (item.id === Number(lessonId)) {
        link.setAttribute("aria-current", "page");
        link.classList.add("active");
    }

    listItem.appendChild(link);
    lessonNavigation.appendChild(listItem);
});

    } catch (error) {
        console.error("Error loading lessons:", error);

        document.getElementById("lesson-title").textContent =
            "Unable to load lesson";
    }
});