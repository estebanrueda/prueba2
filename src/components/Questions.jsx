import React, { useState, useEffect } from "react";
import preguntas from "./Filtrado";
import "./Questions.css";

const Questions = () => {
  const [question, setQuestion] = useState(0);
  const [timeOut, setTimeOut] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [points, setPoints] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  function AnswerSubmit(boolean) {
    if (boolean) setPoints(points + 1);
    setTimeout(() => {
      if (question === preguntas.length - 1) {
        setIsFinished(true);
      } else {
        setQuestion(question + 1);
        setTimeOut(10);
      }
    }, 500);
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (timeOut > 0) setTimeOut((previous) => previous - 1);
      if (timeOut === 0) setAreDisabled(true);
    }, 1000);
    return () => clearInterval(intervalo);
  }, [timeOut]);

  if (isFinished)
    return (
      <main className="box">
        <div className="finalized">
          <span>
            Result {points} of {preguntas.length}
          </span>
          <button onClick={() => (window.location.href = "/")}>
            {" "}
            Play Again
          </button>
        </div>
      </main>
    );

  return (
    <main className="box">
      <div className="lef">
        <div className="title-questions">{preguntas[question].question}</div>

        <div className="questions">
          <span>Questions {question + 1} of</span> {preguntas.length}
        </div>

        <div>
          {" "}
          {!areDisabled ? (
            <span className="time-out">Time:{timeOut} </span>
          ) : (
            <button
              onClick={() => {
                setTimeOut(10);
                setAreDisabled(false);
                if (question === preguntas.length - 1) {
                  setIsFinished(true);
                } else {
                  setQuestion(question + 1);
                }
              }}
            >
              Continue
            </button>
          )}
        </div>
      </div>

      <div className="right">
        {preguntas[question].incorrectAnswers.map((answer) => (
          <button
            disabled={areDisabled}
            key={answer}
            onClick={() => AnswerSubmit(false)}
          >
            {answer}
          </button>
        ))}
        <button
          disabled={areDisabled}
          key={preguntas}
          onClick={() => AnswerSubmit(true)}
        >
          {preguntas[question].correctAnswer}
        </button>
      </div>
    </main>
  );
};

export default Questions;
