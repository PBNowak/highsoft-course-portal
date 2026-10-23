// ============================================================
// ADMIN DASHBOARD
// Fetches data from the admin API and shows it on the page.
// ============================================================


// --- Key numbers ---
// async lets the function wait for the server with await,
// without freezing the page while it waits.
async function loadAdminStats() {
    try {
        // Promise.all starts both requests at the same time
        // and waits until both have answered.
        const [coursesResponse, studentsResponse] = await Promise.all([
            fetch("/api/admin/courses"),
            fetch("/api/admin/students")
        ]);

        // fetch does NOT fail on 404 or 500 by itself,
        // so we have to check .ok and throw an error ourselves.
        if (!coursesResponse.ok || !studentsResponse.ok) {
            throw new Error("Could not fetch admin data");
        }

        // .json() turns the response text into JavaScript arrays/objects
        const courses = await coursesResponse.json();
        const students = await studentsResponse.json();

        // The API only returns students who have given consent
        const studentCount = students.length;

        // filter() keeps the items where the check is true
        const activeCourses = courses.filter(course => course.students_started > 0).length;

        // Start at 0 to avoid dividing by zero when there are no students
        let avgCompletion = 0;

        if (studentCount > 0) {
            // reduce() adds up all values into one total, starting from 0
            const total = students.reduce((sum, student) => sum + student.overall_progress, 0);
            avgCompletion = Math.round(total / studentCount);
        }

        document.getElementById("stat-students").textContent = studentCount;
        document.getElementById("stat-active-courses").textContent = activeCourses;
        document.getElementById("stat-avg-completion").textContent = `${avgCompletion}%`;

    } catch (error) {
        // Shows up in the browser under F12 → Console
        console.error("Could not load admin stats:", error);
    }
}

loadAdminStats();