export function StartPage({ dispatch }) {
  return (
    <div className="flex flex-col gap-8 text-white self-center items-center mt-10">
      <h2 className="font-bold text-3xl">Welcome to the React Quiz!</h2>
      <p className="font-semibold text-xl">
        15 questions to test your React mastery
      </p>
      <button
        className="py-3 px-6 rounded-full font-semibold hover:bg-slate-900  bg-slate-600 hover:border-2 text-white"
        onClick={dispatch}
      >
        lets Start!
      </button>
    </div>
  );
}
