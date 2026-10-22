INSERT OR IGNORE INTO courses
(id, title, level, duration, chart_type, description)
VALUES
(1, 'Introduction to Highcharts', 'Beginner', '2 hours', NULL,
 'Learn the basics of Highcharts and create your first interactive chart.'),

(2, 'JavaScript Fundamentals', 'Beginner', '3 hours', NULL,
 'Learn essential JavaScript skills for building interactive websites.'),

(3, 'Creating Your First Line Chart', 'Beginner', '1 hour', 'line',
 'Create a line chart and learn how to display data clearly.'),

(4, 'Working with Chart Data', 'Intermediate', '2 hours', NULL,
 'Explore how to organize and update data in your charts.'),

(5, 'Customising Highcharts Charts', 'Intermediate', '3 hours', NULL,
 'Make your charts stand out with colours, labels and custom settings.'),

(6, 'Advanced Data Visualisation', 'Advanced', '4 hours', NULL,
 'Explore advanced techniques for creating interactive data visualisations.'),

(7, 'Building Interactive Dashboards', 'Intermediate', '3 hours', NULL,
 'Combine multiple charts to create interactive dashboards that present data clearly.'),

(8, 'Creating Responsive Charts', 'Intermediate', '2 hours', NULL,
 'Learn how to make charts adapt to different screen sizes and devices.'),

(9, 'Advanced Highcharts Features', 'Advanced', '4 hours', NULL,
 'Explore advanced chart options and techniques for more complex data visualisations.');

 INSERT OR IGNORE INTO lessons
(id, course_id, title, duration, content)
VALUES
(1, 1, 'What is Highcharts?', '10 minutes',
 'Introduction to Highcharts, what it is used for, and how interactive charts help visualise data.');
 INSERT OR IGNORE INTO lessons
(id, course_id, title, duration, content)
VALUES
(2, 1, 'Setting Up Highcharts', '15 minutes',
 'Learn how to include the Highcharts library in a webpage and prepare an HTML container for your first chart.');
 INSERT OR IGNORE INTO lessons
(id, course_id, title, duration, content)
VALUES
(3, 1, 'Creating Your First Chart', '20 minutes',
 'Learn how to create a simple chart using Highcharts and display it on a webpage.');
 INSERT OR IGNORE INTO lessons
(id, course_id, title, duration, content)
VALUES
(4, 1, 'Understanding Chart Data', '20 minutes',
 'Learn how Highcharts uses data and how to add or change values displayed in a chart.');
 INSERT OR IGNORE INTO lessons
(id, course_id, title, duration, content)
VALUES
(5, 1, 'Customising Your Chart', '15 minutes',
 'Learn how to change chart titles, colours and labels to make your visualisations clearer.');
 INSERT OR IGNORE INTO students
(id, name, is_demo)
VALUES
(1, 'Kari', 1);
INSERT OR IGNORE INTO students
(id, name, is_demo)
VALUES
(2, 'Emma', 1),
(3, 'Jonas', 1),
(4, 'Sofie', 1);



-- ============================================================
-- DEMO DATA (Amanda) – extra course, lessons, consent and progress
-- Used by the admin dashboard and landing page
-- ============================================================

-- --- New course from our Figma design ---
INSERT OR IGNORE INTO courses
(id, title, level, duration, chart_type, description)
VALUES
(10, 'Your First Bar Chart', 'Beginner', '1 hour', 'bar',
 'Turn a simple dataset into a clear, readable bar chart with Highcharts.');

-- --- Lessons for more courses ---
INSERT OR IGNORE INTO lessons
(id, course_id, title, duration, content)
VALUES
-- Course 3: Creating Your First Line Chart
(6, 3, 'What Is a Line Chart?', '10 minutes',
 'Learn when a line chart is the right choice and how it shows change over time.'),
(7, 3, 'Adding Time-Based Data', '15 minutes',
 'Learn how to give Highcharts dates or categories on the x-axis.'),
(8, 3, 'Multiple Lines', '15 minutes',
 'Learn how to compare several data series in the same line chart.'),
(9, 3, 'Making It Readable', '20 minutes',
 'Learn how to add titles, labels and a legend so the chart is easy to read.'),

-- Course 4: Working with Chart Data
(10, 4, 'Arrays and Series', '20 minutes',
 'Learn how Highcharts reads data from arrays and what a series is.'),
(11, 4, 'Loading Data from a File', '30 minutes',
 'Learn how to load chart data from a CSV or JSON file.'),
(12, 4, 'Updating Data Live', '30 minutes',
 'Learn how to change chart data while the page is open.'),
(13, 4, 'Cleaning Messy Data', '40 minutes',
 'Learn how to handle missing or wrong values before they reach the chart.'),

-- Course 10: Your First Bar Chart
(14, 10, 'Setting Up Your Chart', '5 minutes',
 'Create the HTML container and add Highcharts to the page.'),
(15, 10, 'Adding Your Data', '6 minutes',
 'Give Highcharts a list of numbers. Each number becomes one bar.'),
(16, 10, 'Labelling the Axes', '5 minutes',
 'Add titles to the x-axis and y-axis so readers know what the bars mean.'),
(17, 10, 'Styling the Bars', '7 minutes',
 'Change the colours and spacing of the bars.'),
(18, 10, 'Wrap-up', '4 minutes',
 'Put it all together and review what you have learned.');

-- --- Consent ---
-- Kari (1) is left out so the live demo starts without consent.
-- Sofie (4) has NOT given consent, so no progress is stored for her.
-- This shows that the admin view only counts students who have consented.
INSERT OR IGNORE INTO progress_consents
(student_id, consent_given, updated_at)
VALUES
(2, 1, '2026-10-01 09:00:00'),
(3, 1, '2026-10-03 18:30:00'),
(4, 0, '2026-10-05 12:00:00');

-- --- Completed lessons ---
INSERT OR IGNORE INTO lesson_completions
(student_id, lesson_id, completed_at)
VALUES
-- Emma: finished Introduction to Highcharts, halfway through the bar chart, started the line chart
(2, 1,  '2026-10-01 09:15:00'),
(2, 2,  '2026-10-01 09:40:00'),
(2, 3,  '2026-10-02 19:00:00'),
(2, 4,  '2026-10-04 20:10:00'),
(2, 5,  '2026-10-06 18:45:00'),
(2, 14, '2026-10-10 17:00:00'),
(2, 15, '2026-10-10 17:20:00'),
(2, 16, '2026-10-12 21:00:00'),
(2, 6,  '2026-10-18 08:30:00'),

-- Jonas: finished Working with Chart Data and the bar chart, started Introduction to Highcharts
(3, 10, '2026-10-03 18:45:00'),
(3, 11, '2026-10-05 19:30:00'),
(3, 12, '2026-10-08 20:00:00'),
(3, 13, '2026-10-11 21:15:00'),
(3, 14, '2026-10-14 18:00:00'),
(3, 15, '2026-10-14 18:10:00'),
(3, 16, '2026-10-15 19:00:00'),
(3, 17, '2026-10-15 19:20:00'),
(3, 18, '2026-10-16 20:00:00'),
(3, 1,  '2026-10-20 17:30:00'),
(3, 2,  '2026-10-21 18:00:00');