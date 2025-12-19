import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const handleLogin = () => {
    axios
      .post("https://qtc.onrender.com/api/v1/users/login", {
        username,
        password,
      })
      .then((res) => {
        if (res.data.role === "super_admin" || res.data.role === "admin") {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("role", res.data.role);
          navigate("/admin");
        }
      })
      .catch((err) => {
        setErr(true);
      });
  };
  return (
    <section className="h-screen w-screen bg-cyan-500 justify-center items-center flex flex-col">
      <div>
        <div className="flex justify-center items-start flex-col">
          <label>Username</label>
          <input
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="w-[300px] h-[50px] mt-4 rounded-md outline-none"
            name="Username"
            placeholder="Username"
          />
        </div>
        <div className="flex justify-center items-start flex-col mt-4">
          <label>Password</label>
          <input
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-[300px] h-[50px] mt-4 rounded-md outline-none"
            name="password"
            placeholder="Password"
          />
        </div>
      </div>
      <button
        className="w-[300px] h-[50px] bg-green-400 rounded-md mt-4"
        onClick={handleLogin}
      >
        Login
      </button>
      {err && <p>Wrong Credentials</p>}
    </section>
  );
}

export default Login;
