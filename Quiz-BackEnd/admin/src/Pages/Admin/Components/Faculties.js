import axios from "axios";
import { useState } from "react";
import Delete from "../../../assets/delete.png";
import Edit from "../../../assets/edit.png";
import React from "react";

const Faculties = ({ specialities, faculties, reload, setReload }) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [title, setTitle] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [specialityId, setSpecialityId] = useState("");
  const [specltiesListMenu, setSpecltiesListMenu] = useState(false);
  const deleteFaculty = (id) => {
    axios
      .delete(`https://qtc.onrender.com/api/v1/quiz/faculty/${id}`, {
        headers,
      })
      .then((res) => {
        setReload(!reload);
      });
  };
  const addFaculty = () => {
    axios
      .post(
        `https://qtc.onrender.com/api/v1/quiz/faculty/`,
        { Title: title, Speciality: specialityId },
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
  const setHandleEdit = (id, title, image) => {
    setId(id);
    setEditTitle(title);
  };
  const editSpeciality = () => {
    axios
      .put(
        `https://qtc.onrender.com/api/v1/quiz/faculty/${id}`,
        { Title: editTitle },
        {
          headers,
        }
      )
      .then((res) => {
        setReload(!reload);
      });
  };
  return (
    <div className="flex justify-center items-center border border-green-400 w-screen h-[calc(100%-60px)]">
      {specltiesListMenu && (
        <div
          className="h-full w-full absolute top-0 left-0"
          onClick={() => setSpecltiesListMenu(false)}
        ></div>
      )}
      {/* add */}
      <div className="flex flex-col border border-blue-400 w-[300px] justify-center items-center h-[250px]">
        <h1 className="text-lg">Add Faculty</h1>
        {/* title input */}
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
        {/* speciality select */}
        <div className="flex justify-center items-start flex-col">
          <label>Speciality</label>
          <div className="relative">
            <input
              autoComplete="off"
              value={speciality}
              readOnly={true}
              type="text"
              className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
              name="Speciality"
              placeholder="Speciality"
              onSelect={() => setSpecltiesListMenu(true)}
            />
            {specltiesListMenu && (
              <div className="w-[290px] bg-white absolute top-[55px] left-0 border border-black cursor-pointer overflow-x-hidden h-[300px] overflow-y-scroll z-30">
                {specialities.map((speciality) => (
                  <div
                    key={speciality._id}
                    className="flex justify-start items-center w-[290px] h-[50px] border-b border-black"
                    onClick={() => {
                      setSpecialityId(speciality._id);
                      setSpeciality(speciality.Title);
                      setSpecltiesListMenu(false);
                    }}
                  >
                    <div className="flex items-center">
                      <img
                        src={speciality.Image}
                        alt="SpecliatyPicture"
                        className="w-[40px] h-[40px] mx-4"
                      />
                      <p>{speciality.Title}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          className="w-[300px] h-[40px] bg-green-300"
          onClick={addFaculty}
        >
          Add Faculty
        </button>
      </div>
      {/* List */}
      <div className="flex flex-col h-[250px] overflow-y-scroll overflow-x-hidden border border-cyan-500 w-[400px] justify-start items-center">
        <h1 className="text-lg">Faculties List</h1>
        {faculties.map((faculty) => (
          <div
            key={faculty._id}
            className="flex justify-between items-center w-[300px] h-[50px]"
          >
            <div className="flex items-center">
              <p>
                {faculty.Speciality.Title}/{faculty.Title}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <img
                onClick={() => deleteFaculty(faculty._id)}
                className="cursor-pointer w-[24px] h-[24px] mx-2 justify-self-end"
                src={Delete}
                alt="delete"
              />
              <img
                onClick={() =>
                  setHandleEdit(faculty._id, faculty.Title, faculty.Image)
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
      <div className="flex flex-col h-[250px] border border-blue-400 w-[300px] justify-start items-center">
        <h1 className="text-lg">Edit Faculty</h1>
        <div className="flex justify-center items-start flex-col">
          <label>edit Title</label>
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
        <div className="flex justify-center items-start flex-col"></div>
        <button
          className="w-[300px] h-[40px] bg-green-300"
          onClick={editSpeciality}
        >
          Edit Faculty
        </button>
      </div>
    </div>
  );
};

export default Faculties;
