import { useEffect, useReducer } from "react";
import { StartPage } from "./components/StartPage";
import Header from "./components/Header";
import { Questions } from "./components/Questions";
import { reducer, initialState, NextButton } from "./components/App";

export function App() {
  const [{ status, questions, questionNum, userAnsIdx, points }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    function fetchQuestions() {
      fetch("http://localhost:4000/questions")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "ready", payload: data }))
        .catch((err) => console.log(err.message));
    }
    fetchQuestions();
  }, []);

  console.log(questionNum, "=========questionNum");

  const totalQuestions = questions.length;
  const currentQuestion = questions[questionNum];
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  return (
    <div className="bg-slate-900 flex flex-col  h-dvh gap-6 py-5 border-2">
      <Header />
      {status === "ready" && (
        <StartPage dispatch={() => dispatch({ type: "start" })} />
      )}
      {status === "start" && (
        <>
          <Questions
            dispatch={dispatch}
            userAnsIdx={userAnsIdx}
            currentQuestion={currentQuestion}
            totalQuestion={totalQuestions}
            questionNum={questionNum}
            points={points}
            totalPoints={totalPoints}
          />
          <NextButton dispatch={dispatch} />
        </>
      )}
      {/* {status === "finished" && <DisplayResults />} */}
    </div>
  );
}
