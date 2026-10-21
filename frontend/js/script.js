
 // Get courses from our Flask backend
async function loadCourses() {
    try {
        const response = await fetch("/api/courses");

        if (!response.ok) {
            throw new Error("Could not fetch courses");
        }

        const courses = await response.json();

        const courseList = document.getElementById("course-list");
        const courseCount = document.getElementById("course-count");
        const loadMoreButton = document.getElementById("load-more-btn");
        const searchInput = document.getElementById("course-search");
        const sortSelect = document.getElementById("course-sort");
        const levelFilter = document.getElementById("level-filter");
        const durationFilter = document.getElementById("duration-filter");
        const topicFilter = document.getElementById("topic-filter");
        const chartTypeFilter = document.getElementById("chart-type-filter");

        courseCount.textContent = `${courses.length} courses available`;
        courseList.innerHTML = "";

        // Start by showing six courses
        let visibleCourses = 6;
        // Keep track of courses that match the search
        let filteredCourses = courses;
        // Sort courses by duration (shortest first)

function sortCourses() {
    if (sortSelect.value === "shortest") {
        filteredCourses.sort((a, b) => {
            return parseFloat(a.duration) - parseFloat(b.duration);
        });
    } else {
        // Restore the original order from the Flask API
        filteredCourses.sort((a, b) => a.id - b.id);
    }
}


        function displayCourses() {
            courseList.innerHTML = "";
            courseCount.textContent = `${filteredCourses.length} courses available`;

            filteredCourses.slice(0, visibleCourses).forEach(course => {
                const card = document.createElement("article");
                card.className = "course-card";

                const image = document.createElement("div");
                image.className = "course-image";
                image.textContent = "Course image";

                const title = document.createElement("h3");
                title.textContent = course.title;

                               const level = document.createElement("span");
                level.className = `course-level level-${course.level.toLowerCase()}`;
                level.textContent = course.level;

              const duration = document.createElement("p");
duration.textContent = `~ ${course.duration}`;

                // Badge + duration on one row
                const meta = document.createElement("div");
                meta.className = "course-meta";
                meta.append(level, duration);

                const description = document.createElement("p");
                description.className = "course-description";
                description.textContent = course.description;

                const button = document.createElement("button");
                button.className = "course-button";
                button.textContent = "View course";
                button.type = "button";
                button.addEventListener("click", () => {
    window.location.href = `course-detail.html?id=${course.id}`;
});

                card.append(image, meta, title, description, button);
                courseList.appendChild(card);
            });

            // Hide the button when all courses are visible
            if (loadMoreButton) {
                loadMoreButton.hidden = visibleCourses >= filteredCourses.length;
            }
        }

        if (loadMoreButton) {
            loadMoreButton.addEventListener("click", () => {
                visibleCourses += 3;
                displayCourses();
            });
        }

        
        // Filter courses as the user types
        searchInput.addEventListener("input", () => {
            const searchText = searchInput.value.toLowerCase().trim();

            filteredCourses = courses.filter(course => {
    const matchesSearch =
        course.title.toLowerCase().includes(searchText) ||
        course.description.toLowerCase().includes(searchText);

    const matchesLevel =
    levelFilter.value === "" ||
    course.level.toLowerCase() === levelFilter.value;

const hours = parseFloat(course.duration);

const matchesDuration =
    durationFilter.value === "" ||
    (durationFilter.value === "short" && hours <= 1) ||
    (durationFilter.value === "medium" && hours >= 1 && hours <= 3) ||
    (durationFilter.value === "long" && hours > 3);

const matchesTopic =
    topicFilter.value === "" ||
    course.title.toLowerCase().includes(topicFilter.value) ||
    course.description.toLowerCase().includes(topicFilter.value);

const matchesChartType =
    chartTypeFilter.value === "" ||
    course.chart_type === chartTypeFilter.value;

return matchesSearch && matchesLevel && matchesDuration && matchesTopic && matchesChartType;
});

            // Keep the selected sorting order when searching
sortCourses();

// Start from the first six matching courses
visibleCourses = 6;
displayCourses();
        });

        // Update courses when the sorting option changes
sortSelect.addEventListener("change", () => {
    filteredCourses = [...filteredCourses];
    sortCourses();
    visibleCourses = 6;
    displayCourses();
});

// Update courses when the level filter changes
levelFilter.addEventListener("change", () => {
    searchInput.dispatchEvent(new Event("input"));
});

// Update courses when the duration filter changes
durationFilter.addEventListener("change", () => {
    searchInput.dispatchEvent(new Event("input"));
});

// Update courses when the topic filter changes
topicFilter.addEventListener("change", () => {
    searchInput.dispatchEvent(new Event("input"));
});

// Update courses when the chart type filter changes
chartTypeFilter.addEventListener("change", () => {
    searchInput.dispatchEvent(new Event("input"));
});
        displayCourses();

    } catch (error) {
        console.error("Could not load courses:", error);
    }
}

loadCourses();
