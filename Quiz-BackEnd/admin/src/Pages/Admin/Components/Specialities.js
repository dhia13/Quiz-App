import axios from "axios";
import { useState } from "react";
import Delete from "../../../assets/delete.png";
import Edit from "../../../assets/edit.png";
import React from "react";

const Specialities = ({ specialities, reload, setReload }) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");

  const deleteSpeciality = (id) => {
    axios
      .delete(`https://qtc.onrender.com/api/v1/quiz/speciality/${id}`, {
        headers,
      })
      .then((res) => {
        setReload(!reload);
      });
  };
  const addSpeciality = () => {
    axios
      .post(
        `https://qtc.onrender.com/api/v1/quiz/speciality/`,
        { Title: title, Image: picture },
        {
          headers,
        }
      )
      .then((res) => {
        setReload(!reload);
      });
  };
  // edit
  const [id, setId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState("");
  const setHandleEdit = (id, title, image) => {
    setId(id);
    setEditTitle(title);
    setEditImage(image);
  };
  const editSpeciality = () => {
    axios
      .put(
        `https://qtc.onrender.com/api/v1/quiz/speciality/${id}`,
        { Title: editTitle, Image: editImage },
        {
          headers,
        }
      )
      .then((res) => {
        setReload(!reload);
      });
  };
  return (
    <div className="flex justify-center items-center border border-green-400 h-[calc(100%-60px)] w-screen">
      {/* add */}
      <div className="flex flex-col h-[240px] border border-blue-400 w-[300px] justify-center items-center">
        <h1>Add Specialty</h1>
        <div className="flex justify-center items-start flex-col">
          <label>Title</label>
          <input
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
            name="Title"
            placeholder="Title"
          />
        </div>
        <div className="flex justify-center items-start flex-col">
          <label>Picture</label>
          <input
            autoComplete="off"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            type="text"
            className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
            name="Username"
            placeholder="Picture Url"
          />
        </div>
        <button
          className="w-[300px] h-[40px] bg-green-300"
          onClick={addSpeciality}
        >
          Add Speciality
        </button>
      </div>
      {/* List */}
      <div className="flex flex-col h-[240px] overflow-y-scroll overflow-x-hidden border border-cyan-500 w-[400px] justify-start items-center">
        <h1>Speclties List</h1>
        {specialities.map((speciality) => (
          <div
            key={speciality._id}
            className="flex justify-around items-center w-[300px] h-[50px] "
          >
            <div className="flex items-center">
              <img
                src={speciality.Image}
                alt="SpecliatyPicture"
                className="w-[40px] h-[40px] mx-4"
              />
              <p>{speciality.Title}</p>
            </div>
            <div className="flex justify-center items-center">
              <img
                onClick={() => deleteSpeciality(speciality._id)}
                className="cursor-pointer w-[24px] h-[24px] mx-2 justify-self-end"
                src={Delete}
                alt="delete"
              />
              <img
                onClick={() =>
                  setHandleEdit(
                    speciality._id,
                    speciality.Title,
                    speciality.Image
                  )
                }
                className="cursor-pointer w-[24px] h-[24px] mx-2 justify-self-end"
                src={Edit}
                alt="delete"
              />
            </div>
          </div>
        ))}
      </div>
      {/* Edit */}
      <div className="flex flex-col h-[240px] border border-blue-400 w-[300px] justify-center items-center">
        <h1>Edit Specialty</h1>
        <div className="flex justify-center items-start flex-col">
          <label>Edit Title</label>
          <input
            autoComplete="off"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            type="text"
            className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
            name="Title"
            placeholder="Edit Title"
          />
        </div>
        <div className="flex justify-center items-start flex-col">
          <label>Picture</label>
          <input
            autoComplete="off"
            value={editImage}
            onChange={(e) => setEditImage(e.target.value)}
            type="text"
            className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
            name="edit image"
            placeholder="edit Picture Url"
          />
        </div>
        <button
          className="w-[300px] h-[40px] bg-green-300"
          onClick={editSpeciality}
        >
          Edit Speciality
        </button>
      </div>
    </div>
  );
};

export default Specialities;
