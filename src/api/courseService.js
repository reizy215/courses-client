import axios from "axios";


let baseUrl = "https://courses-server-olnb.onrender.com/api/courses";

export const fetchAllCourses = (page, limit) => {
    return axios.get(`${baseUrl}?limit=${limit}&page=${page}`);
}

export const fetchTotalPagesCount = (limit) => {
    return axios.get(`${baseUrl}/total?limit=${limit}`);
}

export const fetchAddCourse = (course, token) => {
    return axios.post(baseUrl, course, { headers: { authorization: token } });
}

export const fetchUpdateCourse = (updetedCourse, token) => {
    return axios.put(`${baseUrl}/${updetedCourse._id}`, updetedCourse, { headers: { authorization: token } });
}

export const fetchGetCourseById = (id) => {
    return axios.get(`${baseUrl}/${id}`);
}

export const fetchDeleteCourseById = (id, token) => {
    return axios.delete(`${baseUrl}/${id}`, { headers: { authorization: token } })
}
