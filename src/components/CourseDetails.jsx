import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchGetCourseById } from "../api/courseService";
import ExtendedCourseDetails from "./ExtendedCourseDetails";

import "../styles/courseDetails.scss";


const CourseDetails = () => {

    let params = useParams();
    let [course, setCourse] = useState(null);

    useEffect(() => {
        async function getCourse() {
            try {
                let res = await fetchGetCourseById(params.id);
                setCourse(res.data);
                console.log(res.data);
            }
            catch (err) {
                console.log(err);
                if (err.response?.status == 404)
                    alert(err.response?.data?.message);
                else
                    alert(err.response?.data?.title);
            }
        }

        getCourse();

    }, [params.id]);

    return (
        <div className="Details">
            {course && <ExtendedCourseDetails course={course} />}
        </div>
    );
}

export default CourseDetails;