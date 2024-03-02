import { useEffect, useReducer, useState } from "react";
import { quiz } from "./data";

//   topic: "Javascript",
//   level: "Beginner",
//   totalQuestions: 4,
//   perQuestionScore: 5,
//   questions: [
//     {
//       question:
//         "Which function is used to serialize an object into a JSON string in Javascript?",
//       choices: ["stringify()", "parse()", "convert()", "None of the above"],
//       type: "MCQs",
//       correctAnswer: "stringify()",
//     },

// handling the question change when next is clicked
// selecting the option
// comparing the selected option with correct ans
// updating the points
// saved in a way that question {question: answer}
// {}
let increaseCount = 0;

const initialState = {
  activeQuestion: 0,
  totalCorrectAns: 0,
  userAns: {
    selectedId: 0,
    ans: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "choose_ans": {
      if (state.userAns.ans.length != 0) return state;
      if (action.isCorrect) {
        return {
          ...state,
          userAns: action.payload,
          correctAnswer: state.correctAnswer++,
        };
      }
      return {
        ...state,
        userAns: action.payload,
      };
    }
    case "next_question": {
      if (state.activeQuestion < quiz.questions.length - 1) {
        return {
          ...state,
          activeQuestion: state.activeQuestion + 1,
          userAns: initialState.userAns,
        };
      }
      return { ...state, userAns: initialState.userAns };
    }
  }
}

function App1() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-slate-800 relative top-0">
      <Main></Main>
    </div>
  );
}

export default App1;

function Main() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.activeQuestion, "=======destructuring");
  const { choices, question, correctAnswer } =
    quiz.questions[state?.activeQuestion ?? 0];

  //   const isCorrect = state.userAns.ans == correctAnswer;
  //   console.log(isCorrect, "===========isCorrect");
  //   console.log(state, "==========state");

  function handleOption(choice, correctAnswer, idx) {
    dispatch({
      type: "choose_ans",
      payload: {
        ans: choice,
        selectedId: idx,
        isCorrect: choice === correctAnswer,
      },
    });
  }
  function handleAnsSubmit(e) {
    e.preventDefault();
    dispatch({ type: "next_question", payload: increaseCount++ });
  }

  return (
    <form
      className="flex flex-col flex-1 justify-between gap-4 text-white p-8 relative top-0 bottom-0 w-4/6"
      onSubmit={handleAnsSubmit}
    >
      <Heading />
      <CurrentCalculation questionNumber={state.activeQuestion} />
      <CurrentQuestion question={question} />
      <Options
        choices={choices}
        onSelectOption={handleOption}
        state={state}
        correctAnswer={correctAnswer}
      />
      <Button />
    </form>
  );
}

function Options({ choices, onSelectOption, state, correctAnswer }) {
  const {
    userAns: { ans, selectedId },
  } = state;
  const isSelected = ans != 0;
  const hover = "hover:bg-slate-800 hover:text-white hover:translate-x-4";
  const selected = "bg-blue-600 text-white translate-x-4 border-none";
  const restAll = "bg-orange-500 border-none text-black hover:translate-x-4";

  return (
    <ul className="flex flex-col gap-4 ">
      {choices.map((choice, idx) => (
        <li
          className={`${
            isSelected && idx == selectedId
              ? selected
              : isSelected
              ? restAll
              : hover
          } font-semibold border-2 border-slate-500 bg-slate-500 rounded-full p-3 semi-bold transition-all duration-300 ease-out cursor-pointer`}
          onClick={() => onSelectOption(choice, correctAnswer, idx)}
        >
          {choice}
        </li>
      ))}
    </ul>
  );
}

function CurrentCalculation({ questionNumber }) {
  //   const questionNum = 1;
  console.log(questionNumber, "=========insideCUreent location");

  const points = questionNumber * quiz.perQuestionScore;
  console.log(points);
  return (
    <div className="flex flex-col font-semibold w-full mx-auto gap-1">
      <input
        type="range"
        className={`text-purple-500 pointer-events-none`}
        value={points}
        min={0}
        max={25}
      />
      <div className="flex justify-between">
        <span>Question {questionNumber + 1}/5</span>
        <span>{points}/25 points</span>
      </div>
    </div>
  );
}

function CurrentQuestion({ question }) {
  return <p className="font-semibold text-xl text-white ">{question}</p>;
}

function Button() {
  return (
    <button className="self-end p-2 rounded-xl w-32 bg-purple-500 hover:bg-purple-700 text-white font-semibold">
      Next
    </button>
  );
}

function Heading() {
  return (
    <h2 className="font-bold text-4xl mx-auto p-2 text-purple-400">
      React Quiz
    </h2>
  );
}
