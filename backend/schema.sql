CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    duration TEXT NOT NULL,
    chart_type TEXT,
    description TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY,
    course_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    duration TEXT NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    is_demo INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS progress_consents (
    student_id INTEGER PRIMARY KEY,
    consent_given INTEGER NOT NULL DEFAULT 0 CHECK (consent_given IN (0, 1)),
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id)
);
CREATE TABLE IF NOT EXISTS lesson_completions (
    id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    lesson_id INTEGER NOT NULL,
    completed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id),
    UNIQUE (student_id, lesson_id)
);