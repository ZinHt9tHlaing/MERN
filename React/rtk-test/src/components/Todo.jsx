import { useDispatch } from "react-redux";
import { getTodo } from "../store/reducer/todo";
import { useSelector } from "react-redux";

const Todo = () => {
  const todos = useSelector((state) => state.todo.data);
  const isLoading = useSelector((state) => state.todo.isLoading);
  const isError = useSelector((state) => state.todo.isError);

  const dispatch = useDispatch();

  const todoHandler = () => {
    dispatch(getTodo());
    // console.log(todos);
  };

  return (
    <>
      <button
        onClick={todoHandler}
        className="text-white bg-blue-600 font-medium my-8 px-2 py-1 border-0 rounded-lg outline-none active:scale-90 duration-200"
      >
        Get Todo
      </button>
      <section className="w-[80%] m-auto rounded-lg p-2 text-center text-white bg-blue-500">
        {isLoading && (
          <div className="flex justify-center items-center gap-2">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </p>
            <p>
              Getting todos<span className="animate-pulse">...</span>
            </p>
          </div>
        )}
        {!isLoading &&
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-center items-center gap-2 mb-3"
            >
              <p>{todo.id}</p> -
              <h3>{todo.title}.</h3>
            </div>
          ))}
        {!isLoading && todos.length < 1 && (
          <p>
            Click <span className="font-bold text-lg">Get Todo</span> button to
            get
          </p>
        )}
      </section>
    </>
  );
};

export default Todo;
