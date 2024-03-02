export function DisplayResults({ points, totalPoints }) {
  return (
    <div className="flex items-center justify-center text-white w-3/4 self-center p-2 rounded-xl bg-blue-400">
      You scored {points} out of {totalPoints}
    </div>
  );
}
