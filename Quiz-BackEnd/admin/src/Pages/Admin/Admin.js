import axios from "axios";
import { useEffect, useState } from "react";
import Faculties from "./Components/Faculties";
import Specialities from "./Components/Specialities";
import React from "react";
import Navbar from "../Components/Navbar";
import Emd from "../Admin/Components/Emd";
import Levels from "./Components/Levels";
import Quiz from "./Components/Quiz";
import Users from "./Components/Users";
// import Navbar from "../Components/Navbar";
function Admin() {
  const [reload, setReload] = useState(false);
  const [specialities, setSpecialities] = useState([]);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  //specialities
  useEffect(() => {
    axios
      .get("https://qtc.onrender.com/api/v1/quiz/specialities", {
        headers,
      })
      .then((res) => setSpecialities(res.data.Specialities));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  //faculties
  const [faculties, setFaculties] = useState([]);
  useEffect(() => {
    axios
      .get("https://qtc.onrender.com/api/v1/quiz/faculties", {
        headers,
      })
      .then((res) => setFaculties(res.data.Faculties));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  // emds
  const [emds, setEmds] = useState([]);
  useEffect(() => {
    axios
      .get("https://qtc.onrender.com/api/v1/quiz/emds", {
        headers,
      })
      .then((res) => setEmds(res.data.Emds));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  // levels
  const [levels, setLevels] = useState([]);
  const [levelId, setLevelId] = useState("");
  const [levelData, setLevelData] = useState([]);
  // all levels
  useEffect(() => {
    axios
      .get("https://qtc.onrender.com/api/v1/quiz/levels", {
        headers,
      })
      .then((res) => setLevels(res.data.Levels)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  // get levelBy id filled Quizs
  useEffect(() => {
    if (levelId) {
      axios
        .get(
          `
          https://qtc.onrender.com/api/v1/quiz/level/${levelId}`,
          {
            headers,
          }
        )
        .then((res) => setLevelData(res.data.level)); // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [reload, levelId]);
  // recent Quizs
  const [quizs, setQuizs] = useState([]);
  useEffect(() => {
    axios
      .get("https://qtc.onrender.com/api/v1/quiz/quizs", {
        headers,
      })
      .then((res) => setQuizs(res.data.Quizs)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  const [currentTab, setCurrentTab] = useState("Specialities");
  return (
    <div className="flex justify-center items-center flex-col overflow-x-hidden w-screen h-screen">
      <Navbar setCurrentTab={setCurrentTab} />
      {currentTab === "Specialities" && (
        <Specialities
          specialities={specialities}
          setReload={setReload}
          reload={reload}
        />
      )}
      {currentTab === "Faculties" && (
        <Faculties
          specialities={specialities}
          faculties={faculties}
          reload={reload}
          setReload={setReload}
        />
      )}
      {currentTab === "Emds" && (
        <Emd
          faculties={faculties}
          emds={emds}
          reload={reload}
          setReload={setReload}
        />
      )}
      {currentTab === "Levels" && (
        <Levels
          emds={emds}
          levels={levels}
          reload={reload}
          setReload={setReload}
        />
      )}
      {currentTab === "Quiz" && (
        <Quiz
          levels={levels}
          reload={reload}
          setReload={setReload}
          quizs={quizs}
          levelId={levelId}
          setLevelId={setLevelId}
          levelData={levelData}
        />
      )}
      {currentTab === "Users" && <Users />}
    </div>
  );
}

export default Admin;
