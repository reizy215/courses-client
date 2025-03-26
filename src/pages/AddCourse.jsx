import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import {
    Button,
    MenuItem,
    TextField
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import Swal from "sweetalert2";

import { fetchAddCourse } from "../api/courseService";

import "../styles/add-edit-course.scss";


const AddCourse = () => {

    let navigate = useNavigate();
    let user = useSelector(state => state.user.currentUser);
    const save = async (data) => {
        try {
            if (!user) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Please Log In',
                    text: 'You must be logged in to add a course.',
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
            else {
                let res = await fetchAddCourse(data, user.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'The course was added successfully.',
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                console.log(res);
                navigate("/coursesList");
            }
        }
        catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text:
                    err.response?.status == 403 || err.response?.status == 404 ?
                        err.response?.data?.message
                        : err.response?.data?.title,
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }

    let { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form noValidate className="Add-Edit-Course" onSubmit={handleSubmit(save)}>
            <h1>new course</h1>

            {/* שם הקורס */}
            <TextField
                className="outlined-basic"
                label="Course name"
                variant="outlined"
                type="text"
                fullWidth
                {...register("name", {
                    required: { value: true, message: "Course name is required." }
                })}
                error={!!errors.name}
                helperText={errors.name ? (
                    <span style={{ display: 'flex', color: 'red' }}>
                        <ErrorOutlineIcon style={{ marginRight: 2, fontSize: 15 }} />
                        {errors.name.message}
                    </span>
                ) : null}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: errors.name ? "red" : "#4dd0e1",
                        },
                        "&:hover fieldset": {
                            borderColor: errors.name ? "red" : "#26c6da",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: errors.name ? "red" : "#00acc1",
                        }
                    }
                }}
            />

            {/* תיאור */}
            <TextField
                className="outlined-basic"
                label="Description"
                variant="outlined"
                multiline
                rows={5}
                type="text"
                fullWidth
                {...register("description", {
                    required: { value: true, message: "Course description is required." },
                    minLength: { value: 40, message: "Description must be at least 40 characters." },
                    maxLength: { value: 70, message: "Description must not exceed 70 characters." }
                })}
                error={!!errors.description}
                helperText={errors.description ? (
                    <span style={{ display: 'flex', color: 'red' }}>
                        <ErrorOutlineIcon style={{ marginRight: 2, fontSize: 15 }} />
                        {errors.description.message}
                    </span>
                ) : null}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: errors.description ? "red" : "#4dd0e1",
                        },
                        "&:hover fieldset": {
                            borderColor: errors.description ? "red" : "#26c6da",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: errors.description ? "red" : "#00acc1",
                        }
                    }
                }}
            />

            {/* תאריך */}
            <TextField
                className="outlined-basic"
                label="Course start date"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
                {...register("startDate", {
                    required: { value: true, message: "StartDate is required." },
                    validate: value => {
                        const today = new Date().toISOString().split("T")[0];
                        return value > today || "The start date must be in the future.";
                    }
                })}
                error={!!errors.startDate}
                helperText={errors.startDate ? (
                    <span style={{ display: 'flex', color: 'red' }}>
                        <ErrorOutlineIcon style={{ marginRight: 2, fontSize: 15 }} />
                        {errors.startDate.message}
                    </span>
                ) : null}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: errors.startDate ? "red" : "#4dd0e1",
                        },
                        "&:hover fieldset": {
                            borderColor: errors.startDate ? "red" : "#26c6da",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: errors.startDate ? "red" : "#00acc1",
                        }
                    }
                }}
            />

            {/*  ניתוב לתמונה */}
            <TextField
                className="outlined-basic"
                label="Image path"
                variant="outlined"
                type="text"
                fullWidth
                {...register("imagePath", {
                    required: { value: true, message: "Image path is required." }
                })}
                error={!!errors.imagePath}
                helperText={errors.imagePath ? (
                    <span style={{ display: 'flex', color: 'red' }}>
                        <ErrorOutlineIcon style={{ marginRight: 2, fontSize: 15 }} />
                        {errors.imagePath.message}
                    </span>
                ) : null}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: errors.imagePath ? "red" : "#4dd0e1",
                        },
                        "&:hover fieldset": {
                            borderColor: errors.imagePath ? "red" : "#26c6da",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: errors.imagePath ? "red" : "#00acc1",
                        }
                    }
                }}
            />

            {/*  מחיר */}
            <TextField
                className="outlined-basic"
                label="Price"
                variant="outlined"
                type="number"
                fullWidth
                {...register("price", {
                    required: { value: true, message: "Price is required." },
                    min: { value: 1, message: "Price must be greater than 0." }
                })}
                error={!!errors.price}
                helperText={errors.price ? (
                    <span style={{ display: 'flex', color: 'red' }}>
                        <ErrorOutlineIcon style={{ marginRight: 2, fontSize: 15 }} />
                        {errors.price.message}
                    </span>
                ) : null}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: errors.price ? "red" : "#4dd0e1",
                        },
                        "&:hover fieldset": {
                            borderColor: errors.price ? "red" : "#26c6da",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: errors.price ? "red" : "#00acc1",
                        }
                    }
                }}
            />

            {/* ימי לימודים */}
            <TextField
                className="outlined-basic"
                select
                label="Study days"
                defaultValue={[]}
                SelectProps={{ multiple: true }}
                fullWidth
                error={!!errors.studyDays}
                helperText={errors.studyDays ? (
                    <span style={{ display: 'flex', color: 'red' }}>
                        <ErrorOutlineIcon style={{ marginRight: 2, fontSize: 15 }} />
                        {errors.studyDays.message}
                    </span>
                ) : null}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: errors.studyDays ? "red" : "#4dd0e1",
                        },
                        "&:hover fieldset": {
                            borderColor: errors.studyDays ? "red" : "#26c6da",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: errors.studyDays ? "red" : "#00acc1",
                        }
                    }
                }}
                {...register("studyDays", {
                    required: { value: true, message: "You must select at least one day." }
                })}>
                <MenuItem value="Sunday">Sunday</MenuItem>
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
                <MenuItem value="Thursday">Thursday</MenuItem>
            </TextField>

            {/* פרטי המרצה */}
            <div className="lecturer-section">
                <h3>Lecturer</h3>

                {/* שם המרצה */}
                <TextField
                    className="outlined-lecturer-basic"
                    label="Full name"
                    variant="outlined"
                    type="text"
                    fullWidth
                    {...register("lecturer.fullName", {
                        required: { value: true, message: "Lecturer name is required." }
                    })}
                    error={!!errors.lecturer && !!errors.lecturer.fullName}
                    helperText={errors.lecturer && errors.lecturer.fullName ? (
                        <span style={{ display: 'flex', color: 'red' }}>
                            <ErrorOutlineIcon style={{ marginRight: 2, fontSize: 15 }} />
                            {errors.lecturer.fullName.message}
                        </span>
                    ) : null}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: errors.lecturer && errors.lecturer.fullName ? "red" : "#4dd0e1",
                            },
                            "&:hover fieldset": {
                                borderColor: errors.lecturer && errors.lecturer.fullName ? "red" : "#26c6da",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: errors.lecturer && errors.lecturer.fullName ? "red" : "#00acc1",
                            }
                        }
                    }}
                />

                {/* מייל המרצה */}
                <TextField
                    className="outlined-lecturer-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    fullWidth
                    {...register("lecturer.email", {
                        required: { value: true, message: "Lecturer email is required." },
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Please enter a valid email address."
                        }
                    })}
                    error={!!errors.lecturer && !!errors.lecturer.email}
                    helperText={errors.lecturer && errors.lecturer.email ? (
                        <span style={{ display: 'flex', color: 'red' }}>
                            <ErrorOutlineIcon style={{ marginRight: 2, fontSize: 15 }} />
                            {errors.lecturer.email.message}
                        </span>
                    ) : null}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: errors.lecturer && errors.lecturer.email ? "red" : "#4dd0e1",
                            },
                            "&:hover fieldset": {
                                borderColor: errors.lecturer && errors.lecturer.email ? "red" : "#26c6da",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: errors.lecturer && errors.lecturer.email ? "red" : "#00acc1",
                            }
                        }
                    }}
                />

                {/* טל המרצה */}
                <TextField
                    className="outlined-lecturer-basic"
                    label="Phone"
                    variant="outlined"
                    type="phone"
                    fullWidth
                    {...register("lecturer.phone", {
                        pattern: {
                            value: /^(\+?\d{1,3}[- ]?)?\d{9,10}$/,
                            message: "Please enter a valid phone number."
                        },
                        validate: value => value === "" || /^(\+?\d{1,3}[- ]?)?\d{9,10}$/.test(value)
                    })}
                    error={!!errors.lecturer && !!errors.lecturer.phone}
                    helperText={errors.lecturer && errors.lecturer.phone ? (
                        <span style={{ display: 'flex', color: 'red' }}>
                            <ErrorOutlineIcon style={{ marginRight: 2, fontSize: 15 }} />
                            {errors.lecturer.phone.message}
                        </span>
                    ) : null}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: errors.lecturer && errors.lecturer.phone ? "red" : "#4dd0e1",
                            },
                            "&:hover fieldset": {
                                borderColor: errors.lecturer && errors.lecturer.phone ? "red" : "#26c6da",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: errors.lecturer && errors.lecturer.phone ? "red" : "#00acc1",
                            }
                        }
                    }}
                />
            </div>

            <Button type="submit" variant="contained" className="btn" color="primary" startIcon={<AddCircleOutlineIcon />}>
                add course
            </Button>

        </form>
    );
}

export default AddCourse;