export function NextButton({ dispatch }) {
  return (
    <button
      className="self-end border-2 px-3 py-1 rounded-xl bg-slate-600 hover:bg-slate-900 duration-200 ease-in mr-10 text-white border-slate-600"
      onClick={() => dispatch({ type: "next_question" })}
    >
      next
    </button>
  );
}
