import React from "react";
import { useSelector } from "react-redux";

import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Box
} from "@mui/material";

import "../styles/miniCart.scss"; // דף SCSS


const MiniCart = () => {

    const coursesCart = useSelector((state) => state.cart.coursesCart);
    const totalSum = useSelector((state) => state.cart.totalSum);

    return (
        <Box className="mini-cart">
            <Typography variant="h6" align="center">
                {`${coursesCart.length} courses is in your cart.`}
            </Typography>
            <List className="mini-cart-list">
                {coursesCart.length > 0 ? (
                    coursesCart.map((item) => (
                        <ListItem key={item._id} className="mini-cart-item">
                            <img src={item.imagePath} alt={item.name} className="cart-image" />
                            <ListItemText
                                primary={item.name}
                                secondary={`${item.price} $`}
                                className="cart-text"
                            />
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body2" align="center">
                        The cart is empty.
                    </Typography>
                )}
            </List>
            <Typography variant="h6" align="center">{`Total price: ${totalSum} $`}</Typography>
        </Box>
    );
};

export default MiniCart;