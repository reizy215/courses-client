import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

import {
    Drawer,
    Typography,
    Card,
    CardContent,
    IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import Swal from "sweetalert2";

import { addToCart, removeFromCart } from "../features/cartSlice";
import MiniCart from "./MiniCart";

import "../styles/oneCourse.scss";


const OneCourse = ({ course, isFromCart = false, deleteCourse }) => {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let user = useSelector((state) => state.user.currentUser);
    const [cartOpen, setCartOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
        if (!newOpen)
            navigate(-1);
    }

    const handleEdit = () => {
        localStorage.setItem("selectedCourseForEdit", JSON.stringify(course));
        navigate("/updateCourse");
    };

    const handleAddToCart = () => {
        dispatch(addToCart(course));
        setCartOpen(true);
        setTimeout(() => setCartOpen(false), 3000);
    };

    const handleDelete = (course, token) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This course will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with deleting the course if confirmed
                deleteCourse(course, token);
                Swal.fire("Deleted!", "The course has been deleted.", "success");
            }
        });
    };

    return (
        <Card className={`OneCourse ${isFromCart ? "from-cart" : ""}`}>
            {isFromCart ? (
                <>
                    <Link to={`details/${course._id}`} onClick={toggleDrawer(true)}>
                        <img src={course.imagePath} alt="course" className="course-image" />
                    </Link>
                    <div className="course-details">
                        <Typography variant="h5">{course.name}</Typography>
                        <Typography variant="h6">{course.price}$</Typography>
                    </div>
                    <div className="actions">
                        <IconButton onClick={() => dispatch(removeFromCart(course))} color="error">
                            <RemoveIcon />
                        </IconButton>
                    </div>
                </>
            ) : (
                <CardContent>
                    <Typography className="typography-image">
                        <Link to={`details/${course._id}`} onClick={toggleDrawer(true)}>
                            <img src={course.imagePath} alt="course" className="course-image" />
                        </Link>
                    </Typography>
                    <Typography variant="h5">{course.name}</Typography>
                    <Typography variant="body1" className="dis">{course.description}</Typography>
                    <Typography variant="h6">{course.price}$</Typography>

                    <div className="actions">
                        {user?.role === "ADMIN" ? (
                            <>
                                <IconButton onClick={() => handleDelete(course, user?.token)} color="error">
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton onClick={handleEdit} color="primary">
                                    <EditIcon />
                                </IconButton>
                            </>
                        ) : (
                            <IconButton onClick={handleAddToCart} variant="contained" color="primary">
                                <AddIcon />
                            </IconButton>
                        )}
                    </div>
                </CardContent>
            )}
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Outlet />
            </Drawer>
            {cartOpen && <MiniCart />}
        </Card>
    );
};

export default OneCourse;