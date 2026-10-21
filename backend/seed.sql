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