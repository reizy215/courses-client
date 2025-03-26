import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import {
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Swal from 'sweetalert2';

import { fetchAddUser } from "../api/userService";
import { userIn } from "../features/userSlice";

import "../styles/signUp-logIn.scss";


const SignUp = () => {

    let dispatch = useDispatch();
    let navigate = useNavigate();
    let user = useSelector((state) => state.user.currentUser);
    const [showPassword, setShowPassword] = useState(false);

    const save = async (data) => {
        try {
            let res = await fetchAddUser(data);
            Swal.fire({
                title: "Welcome!",
                text: "You have successfully registered.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
            console.log(res);
            navigate("/coursesList");
            if (user != null)
                dispatch(resetCart());
            dispatch(userIn(res.data));
        }
        catch (err) {
            console.log(err);
            if (err.response.status === 409) {
                Swal.fire({
                    title: "Error",
                    text: err.response.data.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
            else {
                Swal.fire({
                    title: "Error",
                    text: err.response.data.title,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        }
    }

    let { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div className="container">
            <div className="contentContainer">
                <form noValidate className="form" onSubmit={handleSubmit(save)}>

                    <Typography variant="h4" component="h1" className="title">
                        Sign Up
                    </Typography>

                    <div className="formContainer">

                        {/* שם משתמש */}
                        <TextField
                            label="User name"
                            variant="outlined"
                            type="text"
                            className="textField"
                            {...register("userName", {
                                required: { value: true, message: "User name is required." },
                            })}
                            error={!!errors.userName}
                            helperText={errors.userName ? (
                                <span style={{ display: 'flex', color: 'red' }}>
                                    <ErrorOutlineIcon style={{ marginRight: 2, fontSize: 15 }} />
                                    {errors.userName.message}
                                </span>
                            ) : null}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: errors.userName ? "red" : "#4dd0e1",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: errors.userName ? "red" : "#26c6da",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: errors.userName ? "red" : "#00acc1",
                                    }
                                }
                            }}
                        />

                        {/* סיסמה */}
                        <TextField
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            className="textField"
                            {...register("password", {
                                required: { value: true, message: "Password is required." },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message:
                                        "The password must be at least 8 characters long and include letters and numbers.",
                                },
                            })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={!!errors.password}
                            helperText={errors.password ? (
                                <span style={{ display: 'flex', color: 'red' }}>
                                    <ErrorOutlineIcon style={{ marginRight: 2, fontSize: 15 }} />
                                    {errors.password.message}
                                </span>
                            ) : null} sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: errors.password ? "red" : "#4dd0e1",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: errors.password ? "red" : "#26c6da",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: errors.password ? "red" : "#00acc1",
                                    }
                                }
                            }}
                        />

                        {/* מייל */}
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            className="textField"
                            {...register("email", {
                                required: { value: true, message: "Email is required." },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email format.",
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email ? (
                                <span style={{ display: 'flex', color: 'red' }}>
                                    <ErrorOutlineIcon style={{ marginRight: 2, fontSize: 15 }} />
                                    {errors.email.message}
                                </span>
                            ) : null} sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: errors.email ? "red" : "#4dd0e1",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: errors.email ? "red" : "#26c6da",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: errors.email ? "red" : "#00acc1",
                                    }
                                }
                            }}
                        />

                        <Button type="submit" variant="contained" endIcon={<SendIcon />} className="button">
                            Send
                        </Button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;