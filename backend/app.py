from flask import Flask, jsonify
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


if __name__ == "__main__":
    app.run(debug=True)