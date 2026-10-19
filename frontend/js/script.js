
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

        courseCount.textContent = `${courses.length} courses available`;
        courseList.innerHTML = "";

        // Start by showing six courses
        let visibleCourses = 6;

        function displayCourses() {
            courseList.innerHTML = "";

            courses.slice(0, visibleCourses).forEach(course => {
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

                const description = document.createElement("p");
                description.className = "course-description";
                description.textContent = course.description;

                const button = document.createElement("button");
                button.className = "course-button";
                button.textContent = "View course";
                button.type = "button";
                button.disabled = true;
                button.title = "Course details coming soon";

                card.append(image, title, level, duration, description, button);
                courseList.appendChild(card);
            });

            // Hide the button when all courses are visible
            if (loadMoreButton) {
                loadMoreButton.hidden = visibleCourses >= courses.length;
            }
        }

        if (loadMoreButton) {
            loadMoreButton.addEventListener("click", () => {
                visibleCourses += 3;
                displayCourses();
            });
        }

        displayCourses();

    } catch (error) {
        console.error("Could not load courses:", error);
    }
}

loadCourses();
