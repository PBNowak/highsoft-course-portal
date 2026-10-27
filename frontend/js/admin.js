// ============================================================
// ADMIN DASHBOARD
// Fetches data from the admin API once, then fills in
// the key numbers and the Top courses chart.
// ============================================================


// Saved here so the chart buttons can re-draw the chart
// without fetching the data again
let adminCourses = [];


// --- Load data ---
async function loadAdminData() {
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

        adminCourses = await coursesResponse.json();
        const students = await studentsResponse.json();

        showKeyNumbers(adminCourses, students);
        showStudentsTable(students);
        showCoursesChart("started");

    } catch (error) {
        // Shows up in the browser under F12 → Console
        console.error("Could not load admin data:", error);
    }
}


// --- Key numbers ---
function showKeyNumbers(courses, students) {
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
}



// --- Students table ---
function showStudentsTable(students) {
    const tableBody = document.getElementById("students-table-body");
    tableBody.innerHTML = "";

    // Empty state: show a message instead of an empty table
    if (students.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 5;   // stretch the cell across all five columns
        cell.textContent = "No students have given consent yet.";
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }

    students.forEach(student => {
        const row = document.createElement("tr");

        // We build cells with textContent instead of writing HTML with innerHTML.
        // textContent always treats data as plain text, so a name like
        // "<script>" can never run as code (protects against XSS).
        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const coursesCell = document.createElement("td");
        coursesCell.textContent = student.courses_started;

        // Progress: a bar + the number as text.
        // The bar is only decoration (aria-hidden), the text is what screen readers read.
        const progressCell = document.createElement("td");

        const bar = document.createElement("div");
        bar.className = "progress-bar";
        bar.setAttribute("aria-hidden", "true");

        const fill = document.createElement("div");
        fill.className = "progress-fill";
        fill.style.width = `${student.overall_progress}%`;   // e.g. width: 80%
        bar.appendChild(fill);

        const percent = document.createElement("span");
        percent.className = "progress-text";
        percent.textContent = `${student.overall_progress}%`;

        progressCell.append(bar, percent);

        const lastActiveCell = document.createElement("td");
        lastActiveCell.textContent = formatDate(student.last_active);

        // View button. data-student-id stores which student it belongs to,
        // so the next step (student details) knows who to show.
        const actionCell = document.createElement("td");
        const viewButton = document.createElement("button");
        viewButton.type = "button";
        viewButton.className = "view-btn";
        viewButton.textContent = "View";
        viewButton.dataset.studentId = student.student_id;
        // Screen readers hear "View Jonas" instead of only "View"
        viewButton.setAttribute("aria-label", `View ${student.name}`);
        actionCell.appendChild(viewButton);

        row.append(nameCell, coursesCell, progressCell, lastActiveCell, actionCell);
        tableBody.appendChild(row);
    });
}


// Turns "2026-10-21 18:00:00" into "21 Oct"
function formatDate(dateText) {
    // A student who has consented but not started has no date yet
    if (!dateText) {
        return "–";
    }

    // Some browsers can't read the space between date and time,
    // so we swap it for a "T" (the standard format: 2026-10-21T18:00:00)
    const date = new Date(dateText.replace(" ", "T"));

    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}


// --- Top courses chart ---
// mode is "started", "highest" or "lowest"
function showCoursesChart(mode) {
    // [...adminCourses] makes a copy, because sort() changes the list it sorts.
    // Without the copy, the original order would be lost.
    const sorted = [...adminCourses];

    // sort() compares two courses (a and b) at a time.
    // b - a = biggest first, a - b = smallest first.
    if (mode === "started") {
        sorted.sort((a, b) => b.students_started - a.students_started);
    } else if (mode === "highest") {
        sorted.sort((a, b) => b.avg_completion - a.avg_completion);
    } else {
        sorted.sort((a, b) => a.avg_completion - b.avg_completion);
    }

    // Most started shows a count, the other two show a percentage
    const isCount = mode === "started";

    // map() turns each course into one value: a list of titles and a list of numbers
    const titles = sorted.map(course => course.title);
    const values = sorted.map(course => isCount ? course.students_started : course.avg_completion);

    // Highcharts can't read CSS variables, so we read the real color value
    // from :root in style.css. Then the chart always matches the palette.
    const brandColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--brand").trim();

    // Highcharts.chart(id of the div, settings)
    Highcharts.chart("courses-chart", {
        chart: {
            type: "column",
            backgroundColor: "transparent",
            style: { fontFamily: "IBM Plex Sans, sans-serif" }
        },
        title: { text: null },              // the <h2> in the HTML is the title
        xAxis: { categories: titles },
        yAxis: {
            title: { text: isCount ? "Students started" : "Average completion (%)" },
            allowDecimals: false,
            max: isCount ? null : 100        // percentages always go up to 100
        },
        legend: { enabled: false },          // only one series, so no legend needed
        tooltip: {
            valueSuffix: isCount ? " students" : "%"
        },
        series: [{
            name: isCount ? "Students started" : "Average completion",
            data: values,
            color: brandColor,
            borderRadius: 4
        }]
    });
}


// --- Chart buttons ---
// querySelectorAll finds ALL elements with the class, forEach gives each one a click listener
document.querySelectorAll(".toggle-btn").forEach(button => {
    button.addEventListener("click", () => {
        // Mark only the clicked button as active
        document.querySelectorAll(".toggle-btn").forEach(btn => {
            btn.setAttribute("aria-pressed", btn === button ? "true" : "false");
        });

        // dataset.mode reads the data-mode attribute from the HTML
        showCoursesChart(button.dataset.mode);
    });
});


loadAdminData();