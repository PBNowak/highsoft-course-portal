from flask import Flask, jsonify

app = Flask(__name__, static_folder="../frontend", static_url_path="")

@app.route("/")
def home():
    return jsonify({"message": "Highsoft Course Portal API is running!"})


@app.route("/api/courses")
def get_courses():
    courses = [
        {
            "id": 1,
            "title": "Introduction to Highcharts",
            "level": "Beginner",
            "duration": "2 hours"
        },
        {
            "id": 2,
            "title": "JavaScript Fundamentals",
            "level": "Beginner",
            "duration": "3 hours"
        }
    ]

    return jsonify(courses)


if __name__ == "__main__":
    app.run(debug=True)