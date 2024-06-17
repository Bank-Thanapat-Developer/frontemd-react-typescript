import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";

interface ClientRouteProps {
  children: JSX.Element;
  roles: string[];
}

const ClientRoute: React.FC<ClientRouteProps> = ({ children, roles }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    console.log("==== Client route ====");

    if (token && username && role) {
      dispatch(loginSuccess({ token, username, role }));
    }
  }, [dispatch, navigate]);
  const auth = useSelector((state: RootState) => state.auth);

  console.log("==== Client Route");

  if (!auth.role || !roles.includes(auth.role)) {
    if (auth.role && auth.role === "client") {
      return children;
    } else {
      navigate("/");
      alert("client only");
    }
  }
};

export default ClientRoute;
