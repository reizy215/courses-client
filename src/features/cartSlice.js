import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    coursesCart: JSON.parse(localStorage.getItem("coursesCart")) || [],
    totalSum: JSON.parse(localStorage.getItem("totalSum")) || 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log(action.payload);
            let index = state.coursesCart.findIndex(item => item._id == action.payload._id);
            if (index > -1)
                alert("כבר ביקשת להצטרף לקורס זה");
            else {
                state.coursesCart.push(action.payload);
                state.totalSum += action.payload.price;
                localStorage.setItem("coursesCart", JSON.stringify(state.coursesCart));
                localStorage.setItem("totalSum", JSON.stringify(state.totalSum));
            }
        },
        removeFromCart: (state, action) => {
            let index = state.coursesCart.findIndex(item => item._id == action.payload._id);
            if (index > -1) {
                state.coursesCart.splice(index, 1);
                state.totalSum -= action.payload.price;
                localStorage.setItem("coursesCart", JSON.stringify(state.coursesCart));
                localStorage.setItem("totalSum", JSON.stringify(state.totalSum));
            }
        },
        updateCourseInCart: (state, action) => {
            let index = state.coursesCart.findIndex(item => item._id == action.payload._id);
            if (index > -1) {
                state.totalSum -= state.coursesCart[index].price;
                state.totalSum += action.payload.price;
                state.coursesCart[index] = action.payload;
                localStorage.setItem("coursesCart", JSON.stringify(state.coursesCart));
                localStorage.setItem("totalSum", JSON.stringify(state.totalSum));
            }
        },
        resetCart: (state) => {
            state.coursesCart = [];
            state.totalSum = 0;
            localStorage.removeItem("coursesCart");
            localStorage.removeItem("totalSum");
        }
    }
});

export const { addToCart, removeFromCart, updateCourseInCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;