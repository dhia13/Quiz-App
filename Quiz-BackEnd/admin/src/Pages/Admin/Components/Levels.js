import React from "react";
import axios from "axios";
import { useState } from "react";
import Delete from "../../../assets/delete.png";
import Edit from "../../../assets/edit.png";
const Levels = ({ levels, reload, setReload, emds }) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [title, setTitle] = useState("");
  const [emdsListMenu, setEmdsListMenu] = useState(false);
  const [emd, setEmd] = useState("");
  const [emdId, setEmdId] = useState("");
  const deleteLevel = (id) => {
    axios
      .delete(`https://qtc.onrender.com/api/v1/quiz/level/${id}`, {
        headers,
      })
      .then((res) => {
        setReload(!reload);
      });
  };
  const addLevel = () => {
    axios
      .post(
        `https://qtc.onrender.com/api/v1/quiz/level/`,
        { Title: title, Emd: emdId },
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
  const editLevel = () => {
    axios
      .put(
        `https://qtc.onrender.com/api/v1/quiz/level/${id}`,
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
        <h1>Add Level</h1>
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
          <label>emd</label>
          <div className="relative">
            <input
              autoComplete="off"
              value={emd}
              type="text"
              className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
              name="Speciality"
              placeholder="Speciality"
              readOnly={true}
              onSelect={() => setEmdsListMenu(true)}
            />
            {emdsListMenu && (
              <div className="w-[290px] bg-white absolute top-[20] left-0 border border-black">
                {emds.map((emd) => (
                  <div
                    key={emd._id}
                    className="flex justify-start items-center w-[290px] h-[50px] border-b border-black"
                    onClick={() => {
                      setEmdId(emd._id);
                      setEmd(emd.Title);
                      setEmdsListMenu(false);
                    }}
                  >
                    <div className="flex items-center">
                      <p>
                        {emd.Faculty.Speciality.Title}/{emd.Faculty.Title}/
                        {emd.Title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button className="w-[300px] h-[40px] bg-green-300" onClick={addLevel}>
          Add Level
        </button>
      </div>
      {/* list */}
      <div className="flex flex-col h-[240px] overflow-y-scroll overflow-x-hidden border border-cyan-500 w-[400px] justify-start items-center">
        <h1>Levels List</h1>
        {levels.map((level) => (
          <div
            key={level._id}
            className="flex justify-around items-center w-[400px] h-[50px] "
          >
            <div className="flex items-center">
              <p>
                {level.Emd.Faculty.Speciality.Title}/{level.Emd.Faculty.Title}/
                {level.Emd.Title}/{level.Title}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <img
                onClick={() => deleteLevel(level._id)}
                className="cursor-pointer w-[24px] h-[24px] mx-2 justify-self-end"
                src={Delete}
                alt="delete"
              />
              <img
                onClick={() => setHandleEdit(level._id, level.Title)}
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
        <h1>Edit Level</h1>
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
          <button
            className="w-[300px] h-[40px] bg-green-300"
            onClick={editLevel}
          >
            Edit Level
          </button>
        </div>
      </div>
    </div>
  );
};

export default Levels;
