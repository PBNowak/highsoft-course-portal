CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    duration TEXT NOT NULL,
    chart_type TEXT,
    description TEXT NOT NULL
);