import axios from "axios";
import React, { useState } from "react";
import Delete from "../../../assets/delete.png";

const Quiz = ({
  levels,
  reload,
  setReload,
  quizs,
  levelId,
  setLevelId,
  levelData,
}) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [question, setQuestion] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [review, setReview] = useState("");
  const [counter, setCounter] = useState("");
  const [picture, setPicture] = useState("");
  const [falseAnswers, setFalseAnswers] = useState([]);
  const [falseAnswer, setFalseAnswer] = useState("");
  const [levelListMenu, setLevelListMenu] = useState(false);
  const [level, setLevel] = useState("");
  const addFalseAnswer = () => {
    falseAnswers.push(falseAnswer);
    setFalseAnswer("");
  };
  const addQuiz = () => {
    axios
      .post(
        `https://qtc.onrender.com/api/v1/quiz/quiz/`,
        {
          Question: question,
          RightAnswer: rightAnswer,
          FalseAnswers: falseAnswers,
          Review: review,
          Picture: picture,
          Level: levelId,
          Counter: counter,
        },
        {
          headers,
        }
      )
      .then((res) => {
        setReload(!reload);
        setFalseAnswers([]);
      });
  };
  const deleteQuiz = (id) => {
    axios
      .delete(`https://qtc.onrender.com/api/v1/quiz/quiz/${id}`, {
        headers,
      })
      .then((res) => {
        setReload(!reload);
      });
  };
  return (
    <div className="flex flex-col justify-start items-start border border-green-400 w-screen overflow-y-scroll ">
      <div className=" flex justify-start items-start">
        {/* add */}
        <div className="flex flex-col border border-blue-400 w-[300px] justify-center items-center mx-2">
          <h1>Add a Quiz</h1>
          {/* question */}
          <div className="flex justify-center items-start flex-col">
            <label>Question</label>
            <input
              autoComplete="off"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              type="text"
              className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
              name="Question"
              placeholder="Question"
            />
          </div>
          {/* right answer */}
          <div className="flex justify-center items-start flex-col">
            <label>Right Answer</label>
            <input
              autoComplete="off"
              value={rightAnswer}
              onChange={(e) => setRightAnswer(e.target.value)}
              type="text"
              className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
              name="Right Answer"
              placeholder="Right Answer"
            />
          </div>
          {/* False answers */}
          <div className="flex justify-center items-start flex-col ml-1 relative w-[300px]">
            <label>False Answer</label>
            <input
              autoComplete="off"
              value={falseAnswer}
              onChange={(e) => setFalseAnswer(e.target.value)}
              type="text"
              className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
              name="False Answer"
              placeholder="False Answer"
            />
            <button
              onClick={addFalseAnswer}
              className="bg-green-300 w-[290px] h-[40px]"
            >
              add false answer
            </button>
            <div className="w-[300px] break-words">
              {falseAnswers.map((falseanswer) => (
                <p>{falseanswer}</p>
              ))}
            </div>
          </div>
          {/* review */}
          <div className="flex justify-center items-start flex-col">
            <label>Review</label>
            <input
              autoComplete="off"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              type="text"
              className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
              name="Review"
              placeholder="Review"
            />
          </div>
          {/* Counter */}
          <div className="flex justify-center items-start flex-col">
            <label>Counter</label>
            <input
              autoComplete="off"
              value={counter}
              onChange={(e) => setCounter(e.target.value)}
              type="text"
              className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
              name="Counter"
              placeholder="Counter"
            />
          </div>
          {/* Picture */}
          <div className="flex justify-center items-start flex-col">
            <label>Picture</label>
            <div className="relative">
              <input
                autoComplete="off"
                value={picture}
                type="text"
                className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
                name="Picture"
                placeholder="Picture"
                onChange={(e) => setPicture(e.target.value)}
              />
            </div>
          </div>
          {/* Level */}
          <div className="flex justify-center items-start flex-col">
            <label>Level</label>
            <div className="relative">
              <input
                autoComplete="off"
                value={level}
                type="text"
                className="w-[290px] h-[50px] mt-2 rounded-md border my-2 border-cyan-500"
                name="Level"
                placeholder="Level"
                onSelect={() => setLevelListMenu(true)}
              />
              {levelListMenu && (
                <div className="w-[290px] bg-white absolute top-[59px] left-0  border border-black">
                  {levels.map((level) => (
                    <div
                      key={level._id}
                      className="flex justify-start items-center w-[290px] h-[100px] border-b border-black"
                      onClick={() => {
                        setLevelId(level._id);
                        setLevel(level.Title);
                        setLevelListMenu(false);
                      }}
                    >
                      <div className="flex items-center">
                        <p>
                          {level.Emd.Faculty.Speciality.Title}/
                          {level.Emd.Faculty.Title}/{level.Emd.Title}/
                          {level.Title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button className="w-[300px] h-[40px] bg-green-300" onClick={addQuiz}>
            Add Quiz
          </button>
        </div>
        {/* List */}
        <div className="overflow-y-scroll overflow-x-hidden w-[calc(100%-320px)] bg-gray-200 mx-5">
          <h1> Level Quizs</h1>
          {levelData.Quizs && (
            <div>
              {levelData.Quizs.map((quiz) => (
                <div className="m-2 border border-black p-4 justify-start flex">
                  <div className="">
                    <p>Question : {quiz.Question}</p>
                    <p>Right Answer : {quiz.RightAnswer}</p>
                    <p>
                      Wrong Answers :{" "}
                      {quiz.FalseAnswers.map((answer) => `${answer},`)}
                    </p>
                    <p>Counter : {quiz.Counter}</p>
                    <p>Review : {quiz.Review}</p>
                  </div>
                  <img
                    onClick={() => deleteQuiz(quiz._id)}
                    className="cursor-pointer w-[24px] h-[24px] mx-2 justify-self-end"
                    src={Delete}
                    alt="delete"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Recent */}
      <div className="m-4">
        <h1>Recently Added</h1>
        {
          <div className="h-[calc(100%-60px] overflow-y-scroll overflow-x-hidden">
            {quizs.map((quiz) => (
              <div className="m-2 border border-black p-4 justify-start flex">
                <div className="">
                  <p>Question : {quiz.Question}</p>
                  <p>Right Answer : {quiz.RightAnswer}</p>
                  <p>
                    Wrong Answers :{" "}
                    {quiz.FalseAnswers.map((answer) => `${answer},`)}
                  </p>
                  <p>Counter : {quiz.Counter}</p>
                  <p>Review : {quiz.Review}</p>
                </div>
                <img
                  onClick={() => deleteQuiz(quiz._id)}
                  className="cursor-pointer w-[24px] h-[24px] mx-2 justify-self-end"
                  src={Delete}
                  alt="delete"
                />
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Quiz;
