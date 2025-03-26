import axios from "axios";


let baseUrl = "https://courses-server-olnb.onrender.com/api/users";

export const fetchAddUser = (user) => {
    return axios.post(baseUrl, user);
}
export const fetchLogIn = (user) => {
    return axios.post(`${baseUrl}/login`, user);
}