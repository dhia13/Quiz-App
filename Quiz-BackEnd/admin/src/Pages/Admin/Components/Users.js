import axios from "axios";
import React, { useEffect, useState } from "react";
import Delete from "../../../assets/delete.png";
import StarEmpty from "../../../assets/starEmpty.png";
import StarFull from "../../../assets/starFull.png";
const Users = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [reload, setReload] = useState(false);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [users, setUsers] = useState([]);
  // all users
  useEffect(() => {
    axios
      .get("https://qtc.onrender.com/api/v1/users/users", {
        headers,
      })
      .then((res) => setUsers(res.data.users));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  const addUser = () => {
    axios
      .post(
        `https://qtc.onrender.com/api/v1/users/register/`,
        { username: name, password: password },
        {
          headers,
        }
      )
      .then((res) => {
        setReload(!reload);
      });
  };
  const deleteUser = (id) => {
    axios
      .delete(`https://qtc.onrender.com/api/v1/users/${id}`, {
        headers,
      })
      .then((res) => {
        setReload(!reload);
      });
  };
  console.log(users);
  const makeEditor = (id) => {
    axios
      .put(
        `https://qtc.onrender.com/api/v1/users/${id}`,
        {},
        {
          headers,
        }
      )
      .then((res) => setReload(!reload));
  };
  return (
    <div className="flex justify-center items-center border border-green-400 h-[calc(100%-60px)] w-screen">
      <div className="flex flex-col h-[250px] border border-blue-400 w-[300px] justify-center items-center">
        <h1>Add User</h1>
        <div className="flex justify-center items-start flex-col">
          <label>Name</label>
          <input
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
            name="Title"
            placeholder="Name"
          />
        </div>
        <div className="flex justify-center items-start flex-col">
          <label>Password</label>
          <input
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
            name="Username"
            placeholder="Password"
          />
        </div>
        <button className="w-[300px] h-[40px] bg-green-300" onClick={addUser}>
          Add User
        </button>
      </div>
      <div className="">
        <h1>users List</h1>
        <div className="w-[300px] h-[250px] overflow-y-scroll overflow-x-hidden">
          {users.map((user) => (
            <div className="w-[300px] h-[40px] border border-black flex justify-around items-center">
              <p>{user.username}</p>
              <p>{user.role}</p>
              <img
                onClick={() => deleteUser(user._id)}
                className="cursor-pointer w-[24px] h-[24px] mx-2 justify-self-end"
                src={Delete}
                alt="delete"
              />
              <img
                onClick={() => makeEditor(user._id)}
                className="cursor-pointer w-[24px] h-[24px] mx-2 justify-self-end"
                src={user.role === "user" ? StarEmpty : StarFull}
                alt="role"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
