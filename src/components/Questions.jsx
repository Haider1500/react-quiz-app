export function Questions({
  currentQuestion,
  dispatch,
  userAnsIdx,
  totalQuestion,
  questionNum,
  points,
  totalPoints,
}) {
  if (!currentQuestion) return;

  const { question, options, correctOption } = currentQuestion;

  const correct = "bg-blue-300 translate-x-4";
  const answer = "translate-x-4";
  const wrong = "bg-yellow-700";
  const hasAnswered = userAnsIdx !== null;

  return (
    <div className="text-white font-semibold flex flex-col gap-4 px-10">
      <progress
        value={points}
        max={totalPoints}
        className="w-full self-center"
      />
      <div className="flex justify-between">
        <span className="">
          Question: {questionNum + 1}/{totalQuestion}
        </span>
        <span className="">
          Points: {points}/{totalPoints}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xl">{question}</p>
        {options.map((c, idx) => (
          <button
            key={c}
            className={`${
              hasAnswered ? (idx == correctOption ? correct : wrong) : ""
            } ${idx == userAnsIdx ? answer : ""}
             border-2  border-slate-500 bg-slate-500 opacity-80 rounded-full px-4 py-3 transition-all duration-300 ease-in hover:translate-x-3 hover:bg-slate-900 text-left`}
            onClick={() => dispatch({ type: "select", payload: idx })}
            disabled={hasAnswered}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
