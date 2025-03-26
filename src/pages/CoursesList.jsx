import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
    Grid,
    Box,
    Typography,
    Pagination,
    LinearProgress
} from "@mui/material";

import { fetchAllCourses, fetchDeleteCourseById, fetchTotalPagesCount } from "../api/courseService";
import { removeFromCart } from "../features/cartSlice";
import OneCourse from "../components/OneCourse";

import "../styles/coursesList.scss";


const CoursesList = () => {

    const dispatch = useDispatch();
    const [arrCourses, setArrCourses] = useState([]);
    const [pagesCnt, setPagesCnt] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const limit = 9;

    useEffect(() => {
        if (currentPage !== null)
            getFromServer(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const totalPages = async () => {
            const response = await fetchTotalPagesCount(limit);
            setPagesCnt(response.data.totalPages);
        }
        totalPages();
    }, []);

    const getFromServer = (page) => {
        setIsLoading(true); // תחילת טעינה
        fetchAllCourses(page, limit)
            .then((res) => {
                setArrCourses(res.data); // עדכון הנתונים
            })
            .catch((err) => {
                console.log(err);
                alert("Error fetching courses");
            })
            .finally(() => {
                setIsLoading(false); // סיום טעינה
            });
    }

    const deleteCourse = async (course, token) => {
        try {
            await fetchDeleteCourseById(course._id, token);
            dispatch(removeFromCart(course));
            setArrCourses((prev) => prev.filter((item) => item._id !== course._id));
        }
        catch (err) {
            console.log(err);
            alert("Error deleting course");
        }
    }

    const handlePageChange = (_, page) => {
        setCurrentPage(page);
        localStorage.setItem("currentPage", page);
    }

    return (
        <div className="CoursesList">
            {/* פס טעינה במהלך טעינת הנתונים */}
            {isLoading && (
                <Box sx={{ position: "fixed", top: 75, left: 0, width: "100%", zIndex: 1000 }}>
                    <LinearProgress color="success" />
                </Box>
            )}

            <Typography variant="h3" align="center" gutterBottom>
                All courses
            </Typography>

            <Box display="flex" justifyContent="center" marginBottom={2}>
                {currentPage !== null && (
                    <Pagination
                        count={pagesCnt}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{
                            "& .Mui-selected": { backgroundColor: "#008B8B", color: "white" }
                        }}
                        size="large"
                    />
                )}
            </Box>

            <Grid container spacing={2} justifyContent="center">
                {arrCourses.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                        <OneCourse course={item} deleteCourse={deleteCourse} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default CoursesList;