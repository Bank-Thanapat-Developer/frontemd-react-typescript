import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, role } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-gray-800 text-white z-10">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="https://cdn-icons-png.freepik.com/256/9665/9665924.png?ga=GA1.1.1426660444.1718305629&semt=ais_hybrid"
          className="h-8"
          alt="Logo"
        />
        <span className="font-bold">MyApp</span>
      </Link>
      <div className="hidden md:flex gap-6">
        {token ? (
          <>
            {role === "client" && (
              <Link
                to="/clientDashboard"
                className="py-2 w-full text-center hover:bg-pink-700"
              >
                Client Dashboard
              </Link>
            )}
            {role === "admin" && (
              <Link
                to="/adminDashboard"
                className="py-2 w-full text-center hover:bg-pink-700"
              >
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="hover:text-gray-400 focus:outline-none"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-400">
              Register
            </Link>
          </>
        )}
      </div>
      <button
        className="md:hidden flex items-center"
        onClick={() => setShowMenu(!showMenu)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      {showMenu && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center md:hidden">
          {token ? (
            <>
              {role === "client" && (
                <Link
                  to="/clientDashboard"
                  className="py-2 w-full text-center hover:bg-gray-700"
                >
                  Client Dashboard
                </Link>
              )}
              {role === "admin" && (
                <Link
                  to="/adminDashboard"
                  className="py-2 w-full text-center hover:bg-gray-700"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="py-2 w-full text-center hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="py-2 w-full text-center hover:bg-gray-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="py-2 w-full text-center hover:bg-gray-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
