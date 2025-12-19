import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
function Navbar({ setCurrentTab }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (token) {
      axios
        .post("https://qtc.onrender.com/api/v1/users/checktoken", {
          token,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            console.log("token Valid");
          }
        })
        .catch((err) => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate, token]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <div className="w-screen h-[60px] bg-blue-300 flex justify-between items-center text-xl font-semibold ">
        <h1 className="ml-5 cursor-pointer text-white">Qct</h1>
        <p
          className="mr-5 cursor-pointer text-white"
          onClick={() => setCurrentTab("Specialities")}
        >
          Specialities
        </p>
        <p
          className="mr-5 cursor-pointer text-white"
          onClick={() => setCurrentTab("Faculties")}
        >
          Faculties
        </p>
        <p
          className="mr-5 cursor-pointer text-white"
          onClick={() => setCurrentTab("Emds")}
        >
          Emds
        </p>
        <p
          className="mr-5 cursor-pointer text-white"
          onClick={() => setCurrentTab("Levels")}
        >
          Levels
        </p>
        <p
          className="mr-5 cursor-pointer text-white"
          onClick={() => setCurrentTab("Quiz")}
        >
          Quiz
        </p>
        {role === "super_admin" && (
          <p
            className="mr-5 cursor-pointer text-white"
            onClick={() => setCurrentTab("Users")}
          >
            Users
          </p>
        )}
        <h1
          className="mr-5 cursor-pointer text-white"
          onClick={() => handleLogout()}
        >
          Logout
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
