import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import { Navigate } from "react-router-dom";
import { loginSuccess } from "../redux/slices/authSlice";

interface AdminRouteProps {
  children: JSX.Element;
  roles: string[];
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children, roles }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (token && username && role) {
      dispatch(loginSuccess({ token, username, role }));
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!auth.role || !roles.includes(auth.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
