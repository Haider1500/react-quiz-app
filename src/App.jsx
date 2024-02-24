import { useState } from "react";
import { quiz } from "./data";
import { useRef } from "react";

// {
//   question:
//     "Which function is used to serialize an object into a JSON string in Javascript?",
//   choices: ["stringify()", "parse()", "convert()", "None of the above"],
//   type: "MCQs",
//   correctAnswer: "stringify()",
// },

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-black">
      <Wrapper>
        <Main></Main>
      </Wrapper>
    </div>
  );
}

export default App;

function Wrapper({ children }) {
  return (
    <div className="flex flex-1 items-center justify-center w-4/6 border-2 bg-violet-500">
      {children}
    </div>
  );
}

function Main() {
  const [count, setCount] = useState(0);
  const [selectOption, setSelectOption] = useState();
  const [results, setResults] = useState({});

  function handleOption(choice) {
    setSelectOption(choice);
  }
  function handleAnsSubmit(e) {
    e.preventDefault();
    if (count < 3 && selectOption) {
      setCount((count) => count + 1);
    }
    setSelectOption(null);
  }
  const { choices, question, correctAnswer } = quiz.questions[count];

  return (
    <div className="flex flex-col w-9/12 h-4/5  border-2 bg-white p-10 gap-4">
      {/* <QuestionWrapper
        question={question}
        questionNumber={count + 1}
        choices={choices}
        onAnsSubmit={handleAnsSubmit}
        onSelectOption={handleOption}
        selectOption={selectOption}
      /> */}
      <ResultBox data={quiz} />
    </div>
  );
}

function QuestionWrapper({
  question,
  questionNumber,
  choices,
  onAnsSubmit,
  selectOption,
  onSelectOption,
}) {
  return (
    <form
      className="flex flex-col flex-1 justify-between"
      onSubmit={onAnsSubmit}
    >
      <CurrentQuestionNumber questionNumber={questionNumber} />
      <CurrentQuestion question={question} />
      <Options
        choices={choices}
        questionNumber={questionNumber}
        onSelectOption={onSelectOption}
        selectOption={selectOption}
      />
      <Button />
    </form>
  );
}

function Options({ choices, onSelectOption, selectOption }) {
  return (
    <ul className="flex flex-col gap-2 ">
      {choices.map((choice, idx) => (
        <Option
          choice={choice}
          onSelectOption={onSelectOption}
          isSelected={selectOption === choice}
          key={idx}
        />
      ))}
    </ul>
  );
}

function Option({ choice, onSelectOption, isSelected }) {
  const styles = isSelected
    ? "bg-violet-500 text-white"
    : "hover:bg-violet-500 hover:text-white";
  return (
    <li
      className={`${styles} border-2 font-semibold rounded-xl p-3 semi-bold transition-all duration-300 ease-out hover:text-white cursor-pointer`}
      onClick={() => onSelectOption(choice)}
    >
      {choice}
    </li>
  );
}

function CurrentQuestionNumber({ questionNumber }) {
  return (
    <div>
      <span className="font-bold text-purple-700 text-3xl">
        0{questionNumber}
      </span>
      /<span>04</span>
    </div>
  );
}

function CurrentQuestion({ question }) {
  return <p className="font-semibold text-xl text-purple-900 ">{question}</p>;
}

function Button() {
  return (
    <button className="self-end p-2 rounded-xl w-32 bg-purple-500 text-white font-semibold">
      Next
    </button>
  );
}

function ResultBox({ data }) {
  const { totalQuestions, perQuestionScore } = data;
  return (
    <div className="flex flex-col h-3/4 justify-evenly gap-4">
      <h2 className="mx-auto font-bold text-3xl">Result</h2>
      <ul className="flex flex-1 flex-col gap-4 justify-center text-xl">
        <ResultRow name={"Total Question:"} value={totalQuestions} />
        <ResultRow name={"Total Score"} value={4} />
        <ResultRow name={"Correct Answers:"} value={4} />
        <ResultRow name={"Wrong Answers:"} value={4} />
      </ul>
    </div>
  );
}

function ResultRow({ name, value }) {
  return (
    <li>
      <span>{name}</span>{" "}
      <span className="text-violet-600 font-bold">{value}</span>
    </li>
  );
}
