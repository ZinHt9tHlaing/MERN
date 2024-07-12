import React from "react";
import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + 1 };

    case "decrease":
      return {
        ...state,
        count: state.count > 0 ? state.count - 1 : state.count,
      };

    case "updateKey":
      return { ...state, key: action.payload };

    default:
      count: state.count;
  }
};

const ACTION = {
  PLUS: "increase",
  MINUS: "decrease",
  UPDATE_KEY: "updateKey",
};

const App = () => {
  const initialState = { key: "", count: 0 };

  const [state, dispatch] = useReducer(reducer, initialState);

  const increaseBtn = () => {
    dispatch({ type: ACTION.PLUS });
  };

  const decreaseBtn = () => {
    dispatch({ type: ACTION.MINUS });
  };

  const payLoadInput = (e) => {
    dispatch({ type: ACTION.UPDATE_KEY, payload: e.target.value });
  };

  return (
    <div>
      <input type="text" onChange={payLoadInput} />
      <h1>Your key is - {state.key} </h1>
      <button onClick={decreaseBtn}>-</button>
      <span>{state.count}</span>
      <button onClick={increaseBtn}>+</button>
    </div>
  );
};

export default App;
