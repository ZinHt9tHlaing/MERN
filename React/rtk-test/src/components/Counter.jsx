import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { counterActions } from "../store/reducer/counterReducer";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const isShow = useSelector((state) => state.counter.isShow);

  const increaseHandler = () => {
    dispatch(counterActions.increase());
  };

  const increaseBy5Handler = () => {
    dispatch(counterActions.increaseBy5(5));
  };

  const decreaseHandler = () => {
    dispatch(counterActions.decrease());
  };

  const toggleHandler = () => {
    dispatch(counterActions.toggle());
  };

  return (
    <section className=" bg-gray-800 text-white m-auto p-5 mt-5 w-[80%] rounded-lg">
      <h3 className="text-xl font-bold mb-5">Redux Counter</h3>
      {isShow && (
        <h1 className="font-bold text-5xl my-5 transition-transform duration-300">
          {counter}
        </h1>
      )}
      <hr className="mb-5" />
      <div className="flex flex-wrap justify-center items-center gap-2">
        <button
          onClick={increaseHandler}
          className="text-white bg-green-600 font-medium px-2 py-1 border-0 rounded-lg outline-none active:scale-90 duration-200"
        >
          Increase
        </button>
        <button
          onClick={increaseBy5Handler}
          className=" text-white bg-yellow-500 font-medium px-2 py-1 border-0 rounded-lg outline-none active:scale-90 duration-200"
        >
          IncreaseBy+5
        </button>
        <button
          onClick={decreaseHandler}
          className="text-white bg-red-500 font-medium px-2 py-1 border-0 rounded-lg outline-none active:scale-90 duration-200"
        >
          decrease
        </button>
        <button
          onClick={toggleHandler}
          className="text-white bg-blue-600 font-medium px-2 py-1 border-0 rounded-lg outline-none active:transition-all active:scale-90 duration-200"
        >
          Toggle Counter
        </button>
      </div>
    </section>
  );
};

export default Counter;
