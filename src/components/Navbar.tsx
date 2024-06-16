import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className="flex justify-between md:px-10 sm:px-5 px-5 items-center gap-3 text-xl py-1 mb-3 bg-red-400 relative">
      <Link to={"/login"}>
        <img
          src="https://cdn-icons-png.freepik.com/256/9665/9665924.png?ga=GA1.1.1426660444.1718305629&semt=ais_hybrid"
          className="md:h-14 sm:h-9 h-9 hover:opacity-80 cursor-pointer"
          alt="Logo"
        />
      </Link>
      {/* Desktop Menu */}
      <div className="md:block sm:hidden hidden">
        <div className="flex gap-8 items-center">
          <Link to={"/login"}>
            <div className="hover:bg-red-200 hover:text-red-400 p-1 rounded-lg text-yellow-50">
              Login
            </div>
          </Link>
          <Link to={"/register"}>
            <div className="hover:bg-red-200 hover:text-red-400 p-1 rounded-lg text-yellow-50">
              Register
            </div>
          </Link>
        </div>
      </div>
      {/* Title */}
      <div className="flex md:hidden">
        <p className="text-white font-bold">Go Echo & React Typescript</p>
      </div>
      {/* Hamburger Icon */}
      <div className="md:hidden flex items-center">
        <button
          className="text-white focus:outline-none p-1 rounded-lg hover:bg-red-200 hover:text-red-400"
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
      </div>
      {/* Mobile Menu */}
      {showMenu && (
        <div className="absolute top-11 left-0 w-full bg-red-200 flex flex-col items-center md:hidden">
          <Link
            to={"/login"}
            className="py-2 hover:bg-red-200 hover:text-red-400 w-full text-center bg-red-300"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="py-2 hover:bg-red-200 hover:text-red-400 w-full text-center bg-red-300"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
