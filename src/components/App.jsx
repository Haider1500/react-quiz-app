import { useEffect, useReducer } from "react";
import { StartPage } from "./StartPage";
import Header from "./Header";
import { Questions } from "./Questions";
import { DisplayResults } from "./DisplayResults";
import { NextButton } from "./NextButton";

const initialState = {
  questions: [],
  status: "",
  questionNum: 0,
  userAnsIdx: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "ready": {
      return { ...state, questions: action.payload, status: "ready" };
    }
    case "start": {
      return { ...state, status: "start" };
    }
    case "select": {
      const question = state.questions.at(state.questionNum);
      if (question.correctOption === action.payload) {
        return {
          ...state,
          points: state.points + question.points,
          userAnsIdx: action.payload,
        };
      }
      return { ...state, userAnsIdx: action.payload };
    }
    case "next_question": {
      if (state.questionNum > state.questions.length - 1)
        return { ...state, status: "finished" };

      return {
        ...state,
        questionNum:
          state.userAnsIdx !== null ? state.questionNum++ : state.questionNum,
        userAnsIdx: null,
      };
    }
    case "restart": {
      return { ...initialState, questions: state.questions, status: "ready" };
    }

    default:
      throw new Error("unknown ans");
  }
}

function App() {
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
      {status === "finished" && (
        <>
          <DisplayResults points={points} totalPoints={totalPoints} />
          <RestartButton dispatch={dispatch} />
        </>
      )}
    </div>
  );
}

export default App;

function RestartButton({ dispatch }) {
  return (
    <button
      className="border-2 text-white self-end bg-slate-500 p-2 rounded-xl mr-10"
      onClick={() => dispatch({ type: "restart" })}
    >
      Restart quiz
    </button>
  );
}
