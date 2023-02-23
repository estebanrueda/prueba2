import { Button } from "bootstrap";
import React, { useState, useEffect } from "react";
import preguntas from "./Filtrado";
import "./Questions.css";

const Questions = () => {
  const [question, setQuestion] = useState(0);
  const [points, setPoints] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeout, setTimeout] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);

  function handleAnswerSubmit(boolean, e) {
    if (boolean) setPoints(points + 1);
    e.target.classList.add(boolean ? "correct" : "incorrect");
 

    setTimeout(() => {
      if (question === preguntas.length - 1) {
        setIsFinished(true);
      } else {
        setQuestion(question + 1);
        setTimeout(10);
      }
    }, 1000); }

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (timeout > 0) setTimeout((prev) => prev - 1);
      if (timeout === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [timeout]);

  if (isFinished)
    return (
      <main className="box">
        <div className="juego-terminado">
          <span>
            {" "}
            Result {points} of {preguntas.length}{" "}
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
        <div className="questions">
          <span>Questions {question + 1} of</span> {preguntas.length}
        </div>
        <div className="titulo-pregunta"> {preguntas.question} </div>
      </div>
      <div>
        {" "}
        {!areDisabled ? (
          <span className="time-out">Time:{timeout} </span>
        ) : (
          <button
            onClick={() => {
              setTimeout(10);
              setAreDisabled(false);
              setQuestion(question + 1);
            }} >
            Continue
          </button>
        )}
      </div>

      <div className="right">
        {preguntas[question].incorrectAnswers.map((answer) => (
          <button
            disabled={areDisabled}
            key={preguntas.incorrectAnswers}
            onClick={(e) => handleAnswerSubmit(false, e)}>
            {answer}
          </button>
        ))}
        <button
          disabled={areDisabled}
          key={preguntas.correctAnswer}
          onClick={(e) => handleAnswerSubmit(true, e)}
        >
          {preguntas[question].correctAnswer}
        </button>
      </div>
    </main>
  );
};
export default Questions;
