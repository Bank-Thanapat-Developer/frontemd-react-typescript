import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ClientDashboard from "./pages/clients/ClientDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { loginSuccess } from "./redux/slices/authSlice";
import ClientRoute from "./routes/ClientRoute";
import AdminRoute from "./routes/AdminRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (token && username && role) {
      dispatch(loginSuccess({ token, username, role }));
    } else {
      dispatch(loginSuccess({ token: "", username: "", role: "" })); // Clear state if no valid token
    }
  }, [dispatch]);

  return (
    <div className="bg-gray-400 min-h-screen pt-16">
      {/* Adjust padding-top to ensure content is not hidden by Navbar */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/clientDashboard"
          element={
            <ClientRoute roles={["client"]}>
              <ClientDashboard />
            </ClientRoute>
          }
        />
        <Route
          path="/adminDashboard"
          element={
            <AdminRoute roles={["admin"]}>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
