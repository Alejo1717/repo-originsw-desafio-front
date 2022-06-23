import React from "react";
import './styles/App.css';
import Login from './pages/Login';
import MisAcciones from "./pages/MyTask";
import { useSelector } from "react-redux";
import TaskDetails from "./pages/TaskDetails";
import PrivateRoute from "./routers/PrivateRoute";
import ProtectedRoute from "./routers/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { singin } from "./stores/modules/auth.reducer";
import { createUser } from "./stores/modules/user.reducer";
import jwt_decode from "jwt-decode";


function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  React.useEffect(() => {
    const init = async () => {
      const token = await localStorage.getItem('token');
      if (token) {
        const decoded = jwt_decode(token);
        dispatch(createUser(decoded))
        dispatch(singin(true));
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return (
    <Routes>
      <Route
        exact path="/login"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route path="/"
        element={
          <Navigate to="/login" />
        }
      />
      <Route exact path="/my-actions"
        element={
          <PrivateRoute>
            <MisAcciones />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-actions/action-details"
        element={
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
