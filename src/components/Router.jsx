import { Route, Routes, Navigate } from 'react-router-dom';

import SignUp from '../pages/SignUp';
import CoursesCart from '../pages/CoursesCart';
import CoursesList from '../pages/CoursesList'
import LogIn from '../pages/LogIn';
import AddCourse from '../pages/AddCourse';
import CourseDetails from './CourseDetails';
import EditCourse from '../pages/EditCourse';
import ProtectedRoute from './ProtectedRoute';
import Checkout from '../pages/Checkout';


const Router = () => {
    return (
        <Routes>

            <Route path="coursesList" element={<CoursesList />} >
                <Route path="details/:id" element={<CourseDetails />} />
            </Route>

            <Route path="coursesCart" element={
                <ProtectedRoute role={'USER'} to={"coursesList"} needUserIn={false}>
                    <CoursesCart />
                </ProtectedRoute>
            } >
                <Route path="details/:id" element={<CourseDetails />} />
            </Route>

            <Route path="signUp" element={<SignUp />} />

            <Route path="logIn" element={<LogIn />} />

            <Route path="checkout" element={
                <ProtectedRoute role={'USER'} to={"/logIn"}>
                    <Checkout />
                </ProtectedRoute>}
            />

            <Route path="updateCourse" element={
                <ProtectedRoute role={'ADMIN'} to={"coursesList"}>
                    <EditCourse />
                </ProtectedRoute>}
            />

            <Route path="addCourse" element={
                <ProtectedRoute role={'ADMIN'} to={"coursesList"}>
                    <AddCourse />
                </ProtectedRoute>}
            />

            <Route path="*" element={<Navigate to="/coursesList" replace />} />

        </Routes>
    );
}

export default Router;