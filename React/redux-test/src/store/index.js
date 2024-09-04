import { legacy_createStore as createStore } from "redux";

const initialStates = { counter: 0, isShow: true };

const counterReducer = (state = initialStates, action) => {
  if (action.type === "increase") {
    return {
      counter: state.counter + 1,
      isShow: state.isShow,
    };
  }

  if (action.type === "decrease") {
    if (!state.counter < 1) {
      return {
        counter: state.counter - 1,
        isShow: state.isShow,
      };
    }
    return { counter: state.counter };
  }

  if (action.type === "increaseBy5") {
    return {
      counter: state.counter + action.payload,
      isShow: state.isShow,
    };
  }

  if (action.type === "toggle") {
    return {
      isShow: !state.isShow,
      counter: state.counter,
    };
  }

  return state;
};

export const store = createStore(counterReducer);
