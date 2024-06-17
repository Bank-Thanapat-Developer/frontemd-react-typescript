import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import { loginSuccess } from "../redux/slices/authSlice";

interface AdminRouteProps {
  children: JSX.Element;
  roles: string[];
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children, roles }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (token && username && role) {
      dispatch(loginSuccess({ token, username, role }));
    } else {
      dispatch(loginSuccess({ token: "", username: "", role: "" }));
    }
  }, [dispatch]);

  // console.log("===== Admin Route =====");

  if (!auth.role || !roles.includes(auth.role)) {
    if (auth.role && auth.role === "admin") {
      return children;
    } else {
      navigate("/");
      alert("admin only");
    }
  }
};

export default AdminRoute;
