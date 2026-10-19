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
        },
        {
            "id": 3,
            "title": "Creating Your First Line Chart",
            "level": "Beginner",
            "duration": "1 hour"
        },
        {
            "id": 4,
            "title": "Working with Chart Data",
            "level": "Intermediate",
            "duration": "2 hours"
        },
        {
            "id": 5,
            "title": "Customising Highcharts Charts",
            "level": "Intermediate",
            "duration": "3 hours"
        },
        {
            "id": 6,
            "title": "Advanced Data Visualisation",
            "level": "Advanced",
            "duration": "4 hours"
        }
    ]


    return jsonify(courses)


if __name__ == "__main__":
    app.run(debug=True)