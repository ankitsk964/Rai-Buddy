// Sample data for each course
const courses = {
    1: {
        name: "Web Development",
        description: "Learn HTML, CSS, JavaScript, and modern frameworks like React to build dynamic web applications.",
        duration: "Duration: 6 months",
        instructor: "Instructor: John Doe"
    },
    2: {
        name: "Data Science",
        description: "Master data analysis, visualization, and machine learning techniques using Python and R.",
        duration: "Duration: 8 months",
        instructor: "Instructor: Jane Smith"
    },
    3: {
        name: "Robotics",
        description: "Explore robotics and automation, build robots using ROS, Arduino, and Python.",
        duration: "Duration: 5 months",
        instructor: "Instructor: Alan Brown"
    },
    4: {
        name: "Artificial Intelligence",
        description: "Understand the concepts of AI and develop systems capable of intelligent behavior using neural networks.",
        duration: "Duration: 6 months",
        instructor: "Instructor: Sarah Lee"
    },
    5: {
        name: "Machine Learning",
        description: "Dive deep into algorithms that enable machines to learn and improve from data, using Python.",
        duration: "Duration: 7 months",
        instructor: "Instructor: Michael Clark"
    }
};

// Function to display selected course details
function displayCourseDetails() {
    const selectedCourseId = document.getElementById("course").value;
    const courseDetailsDiv = document.getElementById("courseDetails");
    if (selectedCourseId) {
        const course = courses[selectedCourseId];
        document.getElementById("courseName").textContent = "Course: " + course.name;
        document.getElementById("courseDescription").textContent = course.description;
        document.getElementById("courseDuration").textContent = course.duration;
        document.getElementById("courseInstructor").textContent = course.instructor;
        courseDetailsDiv.style.display = "block";
    } else {
        courseDetailsDiv.style.display = "none";
    }
}

// Hide course details initially
document.getElementById("courseDetails").style.display = "none";
