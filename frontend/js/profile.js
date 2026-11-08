
document.addEventListener("DOMContentLoaded", async () => {
    const studentId = 1; // Demo student: Kari

    try {
        const response = await fetch("/api/students");

        if (!response.ok) {
            throw new Error("Could not load students");
        }

        const students = await response.json();
        const student = students.find(
            item => Number(item.id) === studentId
        );

        if (!student) {
            throw new Error("Student not found");
        }

        document.getElementById("profile-name").textContent =
            student.name;
            

        document.querySelector(".profile-avatar").textContent =
    student.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(part => part.charAt(0).toUpperCase())
        .join("");
            const consentResponse = await fetch(
    `/api/students/${studentId}/consent`
);

if (!consentResponse.ok) {
    throw new Error("Could not load consent status");
}

const consent = await consentResponse.json();

document.getElementById("profile-consent").textContent =
    consent.consent_given
        ? "✓ Progress saving enabled"
        : "Progress saving disabled";
        const withdrawButton = document.getElementById(
    "profile-withdraw-consent"
);

const coursesResponse = await fetch(
    `/api/students/${studentId}/courses`
);

if (!coursesResponse.ok) {
    throw new Error("Could not load course progress");
}

const courseData = await coursesResponse.json();
const startedCourses = courseData.courses;

const allCoursesResponse = await fetch("/api/courses");

if (!allCoursesResponse.ok) {
    throw new Error("Could not load recommended courses");
}

const allCourses = await allCoursesResponse.json();

const startedCourseIds = new Set(
    startedCourses.map(course => Number(course.course_id))
);

const recommendedCourses = allCourses
    .filter(course => !startedCourseIds.has(Number(course.id)))
    .slice(0, 3);

const recommendedContainer = document.getElementById(
    "profile-recommended-courses"
);

recommendedCourses.forEach(course => {
    const card = document.createElement("article");
    card.className = "course-card";

const imagePlaceholder = document.createElement("div");
imagePlaceholder.className = "course-image";
imagePlaceholder.textContent = "Course image";

    const title = document.createElement("h3");
    title.textContent = course.title;

    const level = document.createElement("p");
level.className = `profile-course-level ${course.level.toLowerCase()}`;
level.textContent = course.level;

const duration = document.createElement("span");
duration.className = "profile-course-duration";
duration.textContent = `~ ${course.duration}`;

    const description = document.createElement("p");
    description.textContent = course.description;
    description.className = "course-description";

    const link = document.createElement("a");
    link.href = `course-detail.html?course_id=${course.id}`;
    link.textContent = "View course";
    link.className = "course-button";

    const meta = document.createElement("div");
meta.className = "course-meta";

level.className = `course-level level-${course.level.toLowerCase()}`;
duration.className = "course-duration";

meta.append(level, duration);

card.append(imagePlaceholder, meta, title, description, link);
    recommendedContainer.appendChild(card);
});


const completedCourses = startedCourses.filter(
    course => course.progress_percent === 100
);

const completedCoursesContainer = document.getElementById(
    "profile-completed-courses"
);

if (completedCourses.length === 0) {
    completedCoursesContainer.textContent =
        "No completed courses yet.";
} else {
    completedCourses.forEach(course => {
        const card = document.createElement("article");
        card.className = "profile-course-card";

        const title = document.createElement("h3");
        title.textContent = course.title;

        const status = document.createElement("p");
        status.textContent =
            `✓ Completed · ${course.completed_lessons}/${course.total_lessons} lessons`;

        const link = document.createElement("a");
        link.href = `course-detail.html?course_id=${course.course_id}`;
        link.textContent = "View course";

        card.append(title, status, link);
        completedCoursesContainer.appendChild(card);
    });
}

const activeCourses = startedCourses.filter(
    course => course.progress_percent < 100
);

const activeCoursesContainer = document.getElementById(
    "profile-active-courses"
);

if (activeCourses.length === 0) {
    activeCoursesContainer.innerHTML =
        "<p>No courses in progress yet.</p>";
} else {
    activeCourses.forEach(course => {
        const card = document.createElement("article");
        card.className = "profile-course-card";

        const title = document.createElement("h3");
        title.textContent = course.title;

        const progress = document.createElement("p");
        progress.textContent =
            `${course.completed_lessons}/${course.total_lessons} lessons completed`;

        const progressBar = document.createElement("progress");
        progressBar.max = 100;
        progressBar.value = course.progress_percent;
        progressBar.setAttribute(
            "aria-label",
            `${course.title} progress`
        );

        const link = document.createElement("a");
        link.href = `course-detail.html?course_id=${course.course_id}`;
        link.textContent = "Continue course";

        card.append(title, progress, progressBar, link);
        activeCoursesContainer.appendChild(card);
    });
}


const overallProgress = startedCourses.length > 0
    ? Math.round(
        startedCourses.reduce(
            (total, course) => total + course.progress_percent,
            0
        ) / startedCourses.length
    )
    : 0;

document.getElementById("profile-overall-progress").textContent =
    `${overallProgress}%`;

document.getElementById("profile-progress-circle").style.background =
    `conic-gradient(
        #7655d6 0% ${overallProgress}%,
        #e9e2ff ${overallProgress}% 100%
    )`;

Highcharts.chart("profile-progress-chart", {
    chart: {
        type: "column",
        backgroundColor: "transparent",
        height: 250
    },

    title: {
        text: null
    },

    credits: {
        enabled: false
    },

    legend: {
        enabled: false
    },

    xAxis: {
        categories: startedCourses.map(course => course.title),
        labels: {
            style: {
                fontSize: "12px"
            }
        }
    },

    yAxis: {
        min: 0,
        max: 100,
        title: {
            text: null
        },
        labels: {
            format: "{value}%"
        }
    },

    tooltip: {
        pointFormat: "<b>{point.y}% completed</b>"
    },

    plotOptions: {
        column: {
            borderRadius: 6,
            maxPointWidth: 65
        }
    },

    series: [{
        name: "Progress",
        color: "#7655d6",
        data: startedCourses.map(course => course.progress_percent)
    }]
});

withdrawButton.hidden = !consent.consent_given;
withdrawButton.addEventListener("click", async () => {
    const confirmed = window.confirm(
        "Are you sure you want to withdraw consent? " +
        "Your saved lesson progress will be permanently deleted."
    );

    if (!confirmed) {
        return;
    }

    
try {
    const response = await fetch(
        `/api/students/${studentId}/consent`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                consent_given: false
            })
        }
    );

    if (!response.ok) {
        throw new Error("Could not withdraw consent");
    }

    document.getElementById("profile-consent").textContent =
        "Progress saving disabled";

    withdrawButton.hidden = true;

    alert("Consent withdrawn. Saved lesson progress has been deleted.");

} catch (error) {
    console.error("Consent withdrawal failed:", error);
    alert("Something went wrong. Please try again.");
}

});

    } catch (error) {
        console.error("Error loading student profile:", error);
    }
});
