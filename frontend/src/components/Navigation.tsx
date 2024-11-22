import { useAuthStore } from "@/store/authStore";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation: React.FC = () => {
  const { user, logout, token } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Quiz App
        </Link>

        <div className="space-x-4">
          <Link to={"/"} className="text-xl font-bold">
            Home
          </Link>

          {user && token ? (
            <>
              <Link to={"/profile"} className="hover:text-blue-200">
                Profile
              </Link>

              <button onClick={handleLogout} className="hover:text-blue-200">
                Logout
              </button>
            </>
          ) : (
            <>
              {!token && (
                <Link to={"/login"} className="hover:text-blue-200">
                  Login
                </Link>
              )}
              {!token && (
                <Link to={"/register"} className="hover:text-blue-200">
                  Register
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
