import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../stores/modules/auth.reducer";


function ProtectedRoute({ children }) {
    const isAuthenticated = useSelector(selectAuth);
    console.log('isAuthenticated0', isAuthenticated)
    return !isAuthenticated ? children : <Navigate to="/my-actions" />;
}

export default ProtectedRoute;