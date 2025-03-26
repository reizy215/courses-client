import React from "react";

import "../styles/extendedCourseDetails.scss";


const ExtendedCourseDetails = ({ course }) => {

    return (
        <div className="ExtendedCourseDetails">
            <h2 className="title">{course.name}</h2>
            <p className="description">{course.description}</p>
            <p className="price">{course.price} $</p>
            <img src={`../../${course.imagePath}`} alt={course.name} className="course-image" />
            <p className="start-date">
                Start Date: {new Date(course.startDate).toLocaleDateString()}
            </p>
            <h4 className="study-days-title">Study Days:</h4>
            <ul className="study-days-list">
                {course.studyDays.map((day) => (
                    <li key={day} className="study-day">{day}</li>
                ))}
            </ul>
            <h4 className="lecturer-title">Lecturer Details:</h4>
            <p className="lecturer-info">{course.lecturer.fullName}</p>
            <p className="lecturer-info">{course.lecturer.email}</p>
            {course.lecturer.phone && (
                <p className="lecturer-info">{course.lecturer.phone}</p>
            )}
        </div>
    );
};

export default ExtendedCourseDetails;