class Course {
    constructor(name, code) {
        this.name = name;
        this.code = code;
        this.enrolledStudents = [];
    }

    enrollStudent(studentName) {
        this.enrolledStudents.push(studentName);
    }
}

class EnrollmentSystem {
    constructor() {
        this.courses = [];
    }

    addCourse(name, code) {
        const newCourse = new Course(name, code);
        this.courses.push(newCourse);
        this.updateCourseList();
        this.updateCourseSelect();
    }

    enrollStudent(courseCode, studentName) {
        const course = this.courses.find(course => course.code === courseCode);
        if (course) {
            course.enrollStudent(studentName);
            this.updateCourseList();
        }
    }

    updateCourseList() {
        const courseList = document.getElementById("courseList");
        courseList.innerHTML = ""; 

        this.courses.forEach(course => {
            const listItem = document.createElement("li");
            listItem.textContent = `${course.name} (${course.code}): Enrolled Students: ${course.enrolledStudents.join(", ") || "None"}`;
            courseList.appendChild(listItem);
        });
    }

    updateCourseSelect() {
        const courseSelect = document.getElementById("courseSelect");
        courseSelect.innerHTML = ""; 

        this.courses.forEach(course => {
            const option = document.createElement("option");
            option.value = course.code;
            option.textContent = `${course.name} (${course.code})`;
            courseSelect.appendChild(option);
        });
    }
}


const enrollmentSystem = new EnrollmentSystem();


document.getElementById("courseForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const courseName = document.getElementById("courseName").value;
    const courseCode = document.getElementById("courseCode").value;

    enrollmentSystem.addCourse(courseName, courseCode);
    this.reset(); 
});


document.getElementById("enrollmentForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const courseCode = document.getElementById("courseSelect").value;
    const studentName = document.getElementById("studentName").value;

    enrollmentSystem.enrollStudent(courseCode, studentName);
    this.reset(); 
});
