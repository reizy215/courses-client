import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar
} from '@mui/material';
import {
    Menu,
    Home,
    ShoppingCart,
    Add,
    PersonAdd,
    Login,
    Logout
} from '@mui/icons-material';
import {
    purple,
    green,
    blue,
    orange,
    deepOrange,
    pink,
    yellow,
    lightBlue,
    red,
    brown,
    cyan,
    teal,
    common
} from '@mui/material/colors';

import { userOut } from '../features/userSlice';
import { resetCart } from '../features/cartSlice';

import '../styles/navBar.scss';


const NavBar = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        dispatch(userOut());
        dispatch(resetCart());
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const getColorByInitial = (initial) => {
        const colorsMap = {
            A: blue[500],
            B: green[500],
            C: orange[700],
            D: purple[500],
            E: deepOrange[500],
            F: yellow[700],
            G: blue[900],
            H: green[300],
            I: orange[300],
            J: purple[300],
            K: deepOrange[300],
            L: lightBlue[100],
            M: blue[300],
            N: red[900],
            O: red[500],
            P: brown[600],
            Q: brown[900],
            R: yellow[200],
            S: cyan[300],
            T: teal[600],
            U: teal[200],
            V: teal[900],
            W: pink[400],
            X: common[200],
            Y: pink[600],
            Z: pink[800],
        };

        return colorsMap[initial?.toUpperCase()] || pink[200];
    };

    return (
        <div className='NavBar'>
            <AppBar position="static" className='appBar' sx={{ bgcolor: '#008B8B' }}>
                <Toolbar className="nav-container">

                    {/* כפתור תפריט לנייד */}
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} className="menu-button">
                        <Menu />
                    </IconButton>
                    <div className='logoUser'>
                        <Typography variant="h6" className="logo">
                            <img src="https://skillgo-courses-byta.netlify.app/images/logo.png" alt="logo" width="170px" height="70px" />
                        </Typography>
                        <Typography variant="h6" className="userName">
                            {!user ? (
                                <Avatar src="/broken-image.jpg" />
                            ) : (
                                <Avatar sx={{ bgcolor: getColorByInitial(user.userName.substr(0, 1)) }}>
                                    {user.userName ? user.userName.substr(0, 1).toUpperCase() : ''}
                                </Avatar>
                            )}
                            <div className='name'>
                                {!user ? "Guest" : user.userName}
                            </div>
                        </Typography>
                    </div>

                    {/* כפתורי ניווט בדסקטופ */}
                    <Box className="nav-links">
                        <Button component={Link} to="/coursesList" color="inherit" startIcon={<Home />} />
                        {(!user || user.role === 'USER') && <Button component={Link} to="/coursesCart" color="inherit" startIcon={<ShoppingCart />} />}
                        {(user && user.role === 'ADMIN') && <Button component={Link} to="/addCourse" color="inherit" startIcon={<Add />} >Add Course</Button>}
                        {!user && <Button component={Link} to="/signUp" color="inherit" startIcon={<PersonAdd />} >Sign Up</Button>}
                        {!user && <Button component={Link} to="/logIn" color="inherit" startIcon={<Login />} >Log In</Button>}
                        {user && <Button color="inherit" onClick={handleLogout} startIcon={<Logout />} >Log Out</Button>}
                    </Box>

                </Toolbar>
            </AppBar>

            {/* תפריט צד למובייל */}
            <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
                <List>
                    <ListItem button component={Link} to="/coursesList" onClick={handleDrawerToggle} sx={{ color: "black" }}>
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText primary="All Courses" />
                    </ListItem>
                    {(!user || user.role === 'USER') && (
                        <ListItem button component={Link} to="/coursesCart" onClick={handleDrawerToggle} sx={{ color: "black" }}>
                            <ListItemIcon><ShoppingCart /></ListItemIcon>
                            <ListItemText primary="Course Basket" />
                        </ListItem>
                    )}
                    {(user && user.role === 'ADMIN') && (
                        <ListItem button component={Link} to="/addCourse" onClick={handleDrawerToggle} sx={{ color: "black" }}>
                            <ListItemIcon><Add /></ListItemIcon>
                            <ListItemText primary="Add Course" />
                        </ListItem>
                    )}
                    {!user && (
                        <ListItem button component={Link} to="/signUp" onClick={handleDrawerToggle} sx={{ color: "black" }}>
                            <ListItemIcon><PersonAdd /></ListItemIcon>
                            <ListItemText primary="Sign Up" />
                        </ListItem>
                    )}
                    {!user && (
                        <ListItem button component={Link} to="/logIn" onClick={handleDrawerToggle} sx={{ color: "black" }}>
                            <ListItemIcon><Login /></ListItemIcon>
                            <ListItemText primary="Log In" />
                        </ListItem>
                    )}
                    {user && (
                        <ListItem button onClick={() => { handleLogout(); handleDrawerToggle(); }} sx={{ color: "black" }}>
                            <ListItemIcon><Logout /></ListItemIcon>
                            <ListItemText primary="Log Out" />
                        </ListItem>
                    )}
                </List>
            </Drawer>
        </div>
    );
};

export default NavBar;