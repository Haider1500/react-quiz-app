import { useReducer } from "react";

const initialState = {
  isActive: false,
  balance: 0,
  loan: 0,
};

function reducer(state, action) {
  if (!state.isActive && action.type !== "open") return state;
  switch (action.type) {
    case "open": {
      return { ...state, balance: action.payload, isActive: true };
    }
    case "deposit": {
      return { ...state, balance: state.balance + action.payload };
    }
    case "withdraw": {
      if (state.balance <= 0) return state;
      return { ...state, balance: state.balance - action.payload };
    }
    case "loan": {
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + 5000,
        loan: state.loan + action.payload,
      };
    }
    case "payLoan": {
      if (state.balance < state.loan) return state;
      return { ...state, balance: state.balance - state.loan, loan: 0 };
    }
    case "close": {
      if (state.loan !== 0 || state.balance !== 0) return state;
      return initialState;
    }
  }
}

function App() {
  const [{ isActive, balance, loan }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <Header balance={balance} loan={loan} />
      <div className="flex flex-col items-center gap-4">
        <Button
          dispatch={() => dispatch({ type: "open", payload: 500 })}
          disabled={isActive}
        >
          Open Account
        </Button>
        <Button
          dispatch={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </Button>
        <Button
          dispatch={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!isActive}
        >
          withdraw 50
        </Button>
        <Button
          dispatch={() => dispatch({ type: "loan", payload: 5000 })}
          disabled={!isActive}
        >
          Request a Loan of 5000
        </Button>
        <Button
          dispatch={() => dispatch({ type: "payLoan" })}
          disabled={!isActive}
        >
          Pay Loan
        </Button>
        <Button
          dispatch={() => dispatch({ type: "close" })}
          disabled={!isActive}
        >
          Close Account
        </Button>
      </div>
    </div>
  );
}

export default App;

function Header({ balance, loan }) {
  return (
    <>
      <h1 className="text-3xl font-bold">UseReducer Bank Account</h1>
      <p className="text-xl">Balance: {balance}</p>
      <p className="text-xl">Loan: {loan}</p>
    </>
  );
}

function Button({ children, dispatch, disabled }) {
  console.log(disabled, "===========disabled");
  const style = disabled && "bg-slate-200";
  return (
    <button
      onClick={dispatch}
      className={`border-2 bg-slate-400 font-semibold text-black p-2 rounded-lg ${
        disabled ? "bg-slate-200 " : ""
      }`}
      style={{ backgroundColor: `${disabled ? "white" : ""}` }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
