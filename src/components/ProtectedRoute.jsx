import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, role, to, needUserIn = true }) => {
    let user = useSelector(state => state.user.currentUser);

    if ((needUserIn && !user) || (user && user.role != role))
        return <Navigate to={to} replace />;
    return children;
}

export default ProtectedRoute;