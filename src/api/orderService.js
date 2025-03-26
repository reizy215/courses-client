import axios from "axios";


let baseUrl = "https://courses-server-olnb.onrender.com/api/orders";

export const fetchAddOrder = (order, token) => {
    let arr = order.courses;
    order.courses = arr.map(course => ({
        _id: course._id,
        name: course.name,
        price: course.price
    }));
    return axios.post(baseUrl, order, { headers: { authorization: token } });
}