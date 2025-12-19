import axios from "axios";
import { useState } from "react";
import Delete from "../../../assets/delete.png";
import Edit from "../../../assets/edit.png";
import React from "react";

const Emd = ({ faculties, emds, setReload, reload }) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [title, setTitle] = useState("");
  const [facultiesListMenu, setFacultiesListMenu] = useState(false);
  const [faculty, setFaculty] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const deleteEmd = (id) => {
    axios
      .delete(`https://qtc.onrender.com/api/v1/quiz/emd/${id}`, {
        headers,
      })
      .then((res) => {
        setReload(!reload);
      });
  };
  const addEmd = () => {
    axios
      .post(
        `https://qtc.onrender.com/api/v1/quiz/emd/`,
        { Title: title, Faculty: facultyId },
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
  const editEmd = () => {
    axios
      .put(
        `https://qtc.onrender.com/api/v1/quiz/emd/${id}`,
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
    <div className="flex justify-center items-center border border-green-400 h-[calc(100%-60px)] w-screen">
      {/* add */}
      <div className="flex flex-col h-[240px] border border-blue-400 w-[300px] justify-center items-center">
        <h1>Add Emd</h1>
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
          <label>Faculty</label>
          <div className="relative">
            <input
              autoComplete="off"
              value={faculty}
              type="text"
              className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
              name="Speciality"
              placeholder="Speciality"
              readOnly={true}
              onSelect={() => setFacultiesListMenu(true)}
            />
            {facultiesListMenu && (
              <div className="w-[290px] bg-white absolute top-[50] left-0 border border-black">
                {faculties.map((faculty) => (
                  <div
                    key={faculty._id}
                    className="flex justify-start items-center w-[290px] h-[50px] border-b border-black"
                    onClick={() => {
                      setFacultyId(faculty._id);
                      setFaculty(faculty.Title);
                      setFacultiesListMenu(false);
                    }}
                  >
                    <div className="flex items-center">
                      <p>
                        {faculty.Speciality.Title}/{faculty.Title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button className="w-[300px] h-[40px] bg-green-300" onClick={addEmd}>
          Add Emd
        </button>
      </div>
      {/* list */}
      <div className="flex flex-col h-[240px] overflow-y-scroll overflow-x-hidden border border-cyan-500 w-[400px] justify-start items-center">
        <h1>Emds List</h1>
        {emds.map((emd) => (
          <div
            key={emd._id}
            className="flex justify-around items-center w-[300px] h-[50px] "
          >
            <div className="flex items-center">
              <p>
                {emd.Faculty.Speciality.Title}/{emd.Faculty.Title}/{emd.Title}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <img
                onClick={() => deleteEmd(emd._id)}
                className="cursor-pointer w-[24px] h-[24px] mx-2 justify-self-end"
                src={Delete}
                alt="delete"
              />
              <img
                onClick={() => setHandleEdit(emd._id, emd.Title)}
                className="cursor-pointer w-[24px] h-[24px] mx-2 justify-self-end"
                src={Edit}
                alt="delete"
              />
            </div>
          </div>
        ))}
      </div>
      {/* edit */}
      <div className="flex flex-col h-[240px] border border-blue-400 w-[300px] justify-start items-center">
        <h1>Edit Emd</h1>
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
        <div className="flex justify-center items-start flex-col">
          <button className="w-[300px] h-[40px] bg-green-300" onClick={editEmd}>
            Edit Emd
          </button>
        </div>
      </div>
    </div>
  );
};

export default Emd;
