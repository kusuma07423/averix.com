document.addEventListener("DOMContentLoaded", function () {
    const seeCourseButtons = document.querySelectorAll(".see-course-btn");
    const weekButtons = document.querySelectorAll(".week-option");
    const container = document.querySelector(".courses-container1"); // Scrolling container
    
    const leftButton = document.querySelector(".left-btn");
    const rightButton = document.querySelector(".right-btn");
    
    let openCourses = {}; // Track open courses
    let openWeeks = {}; // Track open weeks per course

    // ✅ Function to toggle course schedule
    function toggleCourseSchedule(scheduleId) {
        let schedule = document.getElementById(scheduleId);
        if (!schedule) return;

        // Close all other course schedules before opening a new one
        Object.keys(openCourses).forEach((key) => {
            if (openCourses[key] && key !== scheduleId) {
                document.getElementById(key).style.display = "none";
                openCourses[key] = false;
            }
        });

        // Toggle the current course schedule
        schedule.style.display = (schedule.style.display === "none" || schedule.style.display === "") ? "block" : "none";
        openCourses[scheduleId] = schedule.style.display === "block";
    }

    // ✅ Attach event listeners to all "See Course" buttons
    seeCourseButtons.forEach(button => {
        button.addEventListener("click", function () {
            const scheduleId = this.getAttribute("data-schedule-id");
            toggleCourseSchedule(scheduleId);
        });
    });

    // ✅ Function to toggle week content
    function toggleWeek(weekId, courseId) {
        // Close any previously opened week within the same course
        if (openWeeks[courseId] && openWeeks[courseId] !== weekId) {
            let prevWeek = document.getElementById(openWeeks[courseId]);
            if (prevWeek) {
                prevWeek.style.display = "none"; // Hide the previous week's content
            }
        }

        let weekContent = document.getElementById(weekId);
        if (!weekContent) return;

        // Toggle the current week's content
        weekContent.style.display = (weekContent.style.display === "none" || weekContent.style.display === "") ? "block" : "none";
        openWeeks[courseId] = weekContent.style.display === "block" ? weekId : null;
    }

    // ✅ Attach event listeners to all week buttons
    weekButtons.forEach(weekButton => {
        weekButton.addEventListener("click", function () {
            const weekId = this.getAttribute("data-week-id");
            const courseId = this.getAttribute("data-course-id");
            toggleWeek(weekId, courseId);
        });
    });

    // ✅ Hide all week contents initially
    document.querySelectorAll(".week-content").forEach(content => {
        content.style.display = "none";
    });

    // ✅ Hide all course schedules initially
    document.querySelectorAll(".course-schedule").forEach(schedule => {
        schedule.style.display = "none";
    });

    // ✅ Course Navigation (Scrolling Left & Right)
    function getCourseWidth() {
        const course = document.querySelector(".course");
        return course ? course.offsetWidth + 15 : 300; // Default width if not found
    }

    function scrollLeft() {
        container.scrollBy({ left: -getCourseWidth() * 2, behavior: "smooth" });
    }

    function scrollRight() {
        container.scrollBy({ left: getCourseWidth() * 2, behavior: "smooth" });
    }

    if (leftButton && rightButton) {
        leftButton.addEventListener("click", scrollLeft);
        rightButton.addEventListener("click", scrollRight);
    }
});
function redirectToCourse(courseName) {
    window.location.href = `course-details.html?course=${courseName}`;
}

function redirectToCourse(course) {
    window.location.href = `course-details.html?course=${course}`;
}

