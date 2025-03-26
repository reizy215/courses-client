import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Card,
    CardContent
} from '@mui/material';

import { fetchAddOrder } from '../api/orderService';

import "../styles/checkout.scss";


const Checkout = () => {

    let navigate = useNavigate();
    let user = useSelector(state => state.user.currentUser);
    let cart = useSelector(state => state.cart.coursesCart);

    const { handleSubmit, control, formState: { errors } } = useForm();


    const save = async (data) => {
        try {
            if (!user) {
                swal({
                    title: "Error",
                    text: "First log in",
                    icon: "warning",
                    timer: 3000,
                    buttons: false,
                });
            }
            else {
                data.userId = user._id;
                data.courses = cart;
                console.log(data);
                let res = await fetchAddOrder(data, user?.token);
                console.log(res);
                swal({
                    title: "Payment Successful!",
                    text: "Your order has been completed.",
                    icon: "success",
                    timer: 3000,
                    buttons: false,
                });
                navigate("/coursesList");
            }
        }
        catch (err) {
            console.log(err);
            swal({
                title: "Error",
                text: err.response?.data?.title,
                icon: "error",
                timer: 3000,
                buttons: false,
            });
        }
    }

    return (
        <div className='Checkout'>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="20vh" bgcolor="white">
                <Card sx={{ maxWidth: 400, p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Payment</Typography>
                        <form onSubmit={handleSubmit(save)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Controller
                                        name="cardholderId"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Cardholder ID is required',
                                            pattern: {
                                                value: /^[0-9]{9}$/,
                                                message: 'Invalid ID number (9 digits required)'
                                            }
                                        }}
                                        render={({ field }) => (
                                            <TextField {...field} fullWidth label="Cardholder ID" variant="outlined" error={!!errors.cardholderId} helperText={errors.cardholderId?.message} />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="cardNumber"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: 'Credit card number is required', pattern: { value: /^[0-9]{16}$/, message: 'Invalid card number' } }}
                                        render={({ field }) => (
                                            <TextField {...field} fullWidth label="Credit Card Number" variant="outlined" error={!!errors.cardNumber} helperText={errors.cardNumber?.message} />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="expiryDate"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: 'Expiration date is required', pattern: { value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/, message: 'Invalid format (MM/YY)' } }}
                                        render={({ field }) => (
                                            <TextField {...field} fullWidth label="Expiration Date" variant="outlined" placeholder="MM/YY" error={!!errors.expiryDate} helperText={errors.expiryDate?.message} />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="cvv"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: 'CVV is required', pattern: { value: /^[0-9]{3,4}$/, message: 'Invalid CVV' } }}
                                        render={({ field }) => (
                                            <TextField {...field} fullWidth label="CVV" variant="outlined" error={!!errors.cvv} helperText={errors.cvv?.message} />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant="contained" color="primary" type="submit">Pay Now</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}

export default Checkout;