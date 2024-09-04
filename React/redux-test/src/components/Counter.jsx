import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const isShow = useSelector((state) => state.isShow);

  const increaseHandler = () => {
    dispatch({ type: "increase" });
  };

  const increaseBy5Handler = () => {
    dispatch({ type: "increaseBy5", payload: 10 });
  };

  const decreaseHandler = () => {
    dispatch({ type: "decrease" });
  };

  const toggleHandler = () => {
    dispatch({ type: "toggle" });
  };

  return (
    <section className="text-center bg-gray-800 text-white w-[80%] m-auto p-5 rounded-lg">
      <h3 className="text-xl font-bold">Redux Counter</h3>
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
