export function Button({ children, dispatch }) {
  return (
    <button className="py-3 px-6 rounded-full font-semibold hover:bg-slate-500  bg-slate-600 text-white">
      {children}
    </button>
  );
}
