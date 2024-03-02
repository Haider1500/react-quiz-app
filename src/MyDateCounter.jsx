import { useReducer, useState } from "react";
import DateCounter from "./DateCounter";

// show the date on the screen mon jun 21 2017
//input bar to add the number of days to the date displayed
//+ and - on the sides of the input bar to increase or decrease the amount to add to the days
//how big the steps to increase or decrease the number of the days should be

// let presentDate = new Date(2025, 9, 12)

const initialState = {
  step: 1,
  value: 0,
};

function MyDateCounter() {
  const [step, setStep] = useState(1);
  const [value, setValue] = useState(0);
  const [date, setDate] = useState("2025, 9, 12");
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "step_change": {
        return { ...state, step: action.step };
      }
      case "value_change": {
        return { ...state, value: action.value };
      }
      case "increment": {
        return { ...state, value: state.value + state.step };
      }
      case "decrement": {
        return { ...state, value: state.value - state.step };
      }
      case "reset": {
        return initialState;
      }
    }
  }

  console.log(state, "=========state");

  function handleSetStep(e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "step_change", step: Number(e.target.value) });
  }

  function handleValue(e) {
    // setValue(e.target.value);
    dispatch({ type: "value_change", value: Number(e.target.value) });
  }

  function handleIncreaseValue(value) {
    // setValue((value) => value + step);
    dispatch({ type: "increment", value: value });
  }

  function handleDecreaseValue(value) {
    dispatch({ type: "decrement", value: value });
  }

  function handleDate() {}

  function handleReset() {
    dispatch({ type: "reset" });
  }

  return (
    <div className="flex flex-col h-dvh gap-10 items-center justify-center bg-black text-white">
      <StepsToggler onSetStep={handleSetStep} step={state.step} />
      <InputBar
        value={state.value}
        onSetValue={handleValue}
        onIncreaseValue={handleIncreaseValue}
        onDecreaseValue={handleDecreaseValue}
      />
      <DateDisplay value={state.value} />
      <button
        className="bg-white w-fit p-2 rounded-md font-bold text-black"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}

export default MyDateCounter;

function StepsToggler({ onSetStep, step }) {
  return (
    <div className="flex items-center gap-1 text-black">
      <input type="range" min={0} max={10} value={step} onChange={onSetStep} />
      <span className="text-white w-6">{step}</span>
    </div>
  );
}

function InputBar({ value, onSetValue, onIncreaseValue, onDecreaseValue }) {
  return (
    <div className="flex gap-2">
      <button
        className="bg-white w-6 rounded-md font-bold text-black"
        onClick={() => onDecreaseValue(value)}
      >
        -
      </button>
      <input
        type="number"
        className="text-black outline-slate-400 p-1"
        onChange={onSetValue}
        value={value}
      />
      <button
        className="bg-white w-6 rounded-md font-bold text-black"
        onClick={() => onIncreaseValue(value)}
      >
        +
      </button>
    </div>
  );
}

function DateDisplay({ value }) {
  const today = new Date("2025, 9, 12");
  today.setDate(today.getDate() + Number(value));
  const formattedDate = today.toDateString();

  return (
    <div className="flex gap-1 font-bold text-xl">
      <span>{formattedDate}</span>
    </div>
  );
}
