from flask import Flask, jsonify, request
from database import get_connection

app = Flask(__name__, static_folder="../frontend", static_url_path="")

@app.route("/")
def home():
    return jsonify({"message": "Highsoft Course Portal API is running!"})


@app.route("/api/courses")
def get_courses():
    connection = get_connection()

    rows = connection.execute(
        "SELECT id, title, level, duration, chart_type, description FROM courses ORDER BY id"
    ).fetchall()

    courses = [dict(row) for row in rows]

    connection.close()

    return jsonify(courses)
@app.route("/api/courses/<int:course_id>")
def get_course(course_id):
    connection = get_connection()

    row = connection.execute(
        "SELECT id, title, level, duration, chart_type, description FROM courses WHERE id = ?",
        (course_id,)
    ).fetchone()

    connection.close()

    if row is None:
        return jsonify({"error": "Course not found"}), 404

    return jsonify(dict(row))


@app.route("/api/courses/<int:course_id>/lessons")
def get_course_lessons(course_id):
    connection = get_connection()

    rows = connection.execute(
        "SELECT id, course_id, title, duration, content FROM lessons WHERE course_id = ? ORDER BY id",
        (course_id,)
    ).fetchall()

    connection.close()

    return jsonify([dict(row) for row in rows])


@app.route("/api/students")
def get_students():
    connection = get_connection()

    rows = connection.execute(
        "SELECT id, name, is_demo FROM students ORDER BY id"
    ).fetchall()

    connection.close()

    return jsonify([dict(row) for row in rows])


@app.route("/api/students/<int:student_id>/consent")
def get_student_consent(student_id):
    connection = get_connection()

    student = connection.execute(
        "SELECT id FROM students WHERE id = ?",
        (student_id,)
    ).fetchone()

    consent = connection.execute(
        "SELECT consent_given FROM progress_consents WHERE student_id = ?",
        (student_id,)
    ).fetchone()

    connection.close()

    if student is None:
        return jsonify({"error": "Student not found"}), 404

    return jsonify({
        "student_id": student_id,
        "consent_given": bool(consent["consent_given"]) if consent else False
    })


@app.route("/api/students/<int:student_id>/consent", methods=["POST"])
def update_student_consent(student_id):
    data = request.get_json(silent=True)

    if not isinstance(data, dict) or type(data.get("consent_given")) is not bool:
        return jsonify({"error": "consent_given must be true or false"}), 400

    consent_given = data["consent_given"]

    connection = get_connection()

    try:
        student = connection.execute(
            "SELECT id FROM students WHERE id = ?",
            (student_id,)
        ).fetchone()

        if student is None:
            return jsonify({"error": "Student not found"}), 404

        if not consent_given:
            connection.execute(
                "DELETE FROM lesson_completions WHERE student_id = ?",
                (student_id,)
            )

        connection.execute(
            """
            INSERT INTO progress_consents (student_id, consent_given, updated_at)
            VALUES (?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(student_id) DO UPDATE SET
                consent_given = excluded.consent_given,
                updated_at = CURRENT_TIMESTAMP
            """,
            (student_id, int(consent_given))
        )

        connection.commit()

        return jsonify({
            "student_id": student_id,
            "consent_given": consent_given
        })

    finally:
        connection.close()


@app.route("/api/students/<int:student_id>/lessons/<int:lesson_id>/complete", methods=["POST"])
def complete_lesson(student_id, lesson_id):
    connection = get_connection()

    try:
        student = connection.execute(
            "SELECT id FROM students WHERE id = ?",
            (student_id,)
        ).fetchone()

        if student is None:
            return jsonify({"error": "Student not found"}), 404

        consent = connection.execute(
            "SELECT consent_given FROM progress_consents WHERE student_id = ?",
            (student_id,)
        ).fetchone()

        if consent is None or not consent["consent_given"]:
            return jsonify({"error": "Progress saving requires consent"}), 403

        lesson = connection.execute(
            "SELECT id FROM lessons WHERE id = ?",
            (lesson_id,)
        ).fetchone()

        if lesson is None:
            return jsonify({"error": "Lesson not found"}), 404

        connection.execute(
            """
            INSERT OR IGNORE INTO lesson_completions (student_id, lesson_id)
            VALUES (?, ?)
            """,
            (student_id, lesson_id)
        )

        connection.commit()

        return jsonify({
            "student_id": student_id,
            "lesson_id": lesson_id,
            "completed": True
        })

    finally:
        connection.close()


@app.route("/api/students/<int:student_id>/progress")
def get_student_progress(student_id):
    connection = get_connection()

    try:
        student = connection.execute(
            "SELECT id FROM students WHERE id = ?",
            (student_id,)
        ).fetchone()

        if student is None:
            return jsonify({"error": "Student not found"}), 404

        consent = connection.execute(
            "SELECT consent_given FROM progress_consents WHERE student_id = ?",
            (student_id,)
        ).fetchone()

        if consent is None or not consent["consent_given"]:
            return jsonify({
                "student_id": student_id,
                "consent_given": False,
                "completed_lessons": []
            })

        rows = connection.execute(
            """
            SELECT lesson_id, completed_at
            FROM lesson_completions
            WHERE student_id = ?
            ORDER BY completed_at
            """,
            (student_id,)
        ).fetchall()

        return jsonify({
            "student_id": student_id,
            "consent_given": True,
            "completed_lessons": [dict(row) for row in rows]
        })

    finally:
        connection.close()
if __name__ == "__main__":
    app.run(debug=True)