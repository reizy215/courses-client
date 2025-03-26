import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { Payment } from "@mui/icons-material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import OneCourse from "../components/OneCourse";

import "../styles/coursesCart.scss";


const CoursesCart = () => {

    let navigate = useNavigate();
    let coursesCart = useSelector(state => state.cart.coursesCart);
    let totalSum = useSelector(state => state.cart.totalSum);
    let user = useSelector(state => state.user.currentUser);

    const handleEmptyCartAlert = () => {
        navigate("/coursesList");
    }

    return (
        <div className="CoursesCart">
            <h1>My Courses</h1>
            <h2>{`Total items: ${coursesCart.length}`}</h2>
            <h2>{`Total price: ${totalSum} $`}</h2>
            {coursesCart.length > 0 ? (
                <div className="courses-list">
                    {coursesCart.map(item => (
                        <OneCourse key={item._id} course={item} isFromCart={true} />
                    ))}
                </div>
            ) : (
                <div className="empty-cart">
                    <h3>Your cart is currently empty.</h3>
                    <p>Explore courses and start building your learning path.</p>
                    <Button variant="contained" color="primary" onClick={handleEmptyCartAlert} >
                        Explore Courses
                    </Button>
                </div>
            )}
            <div className="cart-buttons">
                <Button
                    component={Link}
                    to="/checkout"
                    color="inherit"
                    startIcon={<Payment />}
                    disabled={(!user || (user && user.role === "ADMIN")) || coursesCart.length === 0}
                >
                    Payment
                </Button>
                <Button
                    component={Link}
                    to="/coursesList"
                    color="inherit"
                    startIcon={<ExitToAppIcon />}
                >
                    Continue Shopping
                </Button>
            </div>
        </div>
    );
}

export default CoursesCart;