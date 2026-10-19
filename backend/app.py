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
    "duration": "2 hours",
    "description": "Learn the basics of Highcharts and create your first interactive chart."
},
        {
            "id": 2,
            "title": "JavaScript Fundamentals",
            "level": "Beginner",
            "duration": "3 hours",
            "description": "Learn essential JavaScript skills for building interactive websites."
        },
        {
            "id": 3,
            "title": "Creating Your First Line Chart",
            "level": "Beginner",
            "duration": "1 hour",
            "description": "Create a line chart and learn how to display data clearly."
        },
        {
            "id": 4,
            "title": "Working with Chart Data",
            "level": "Intermediate",
            "duration": "2 hours",
            "description": "Explore how to organize and update data in your charts."
        },
        {
            "id": 5,
            "title": "Customising Highcharts Charts",
            "level": "Intermediate",
            "duration": "3 hours",
            "description": "Make your charts stand out with colours, labels and custom settings."
        },
        {
            "id": 6,
            "title": "Advanced Data Visualisation",
            "level": "Advanced",
            "duration": "4 hours",
            "description": "Explore advanced techniques for creating interactive data visualisations."
        }
    ]


    return jsonify(courses)


if __name__ == "__main__":
    app.run(debug=True)