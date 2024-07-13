import { useEffect, useState } from "react";

const App = () => {
  // const [todos, setTodos] = useState([]);
  const [id, setId] = useState("");
  const [error, setError] = useState(false);
  const [todo, setTodo] = useState(null);

  // const fetchData = async () => {
  //   const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  //   const data = await res.json();
  //   setTodos(data);
  // };

  useEffect(() => {
    // fetchData();
  }, []);

  const getData = async (e) => {
    e.preventDefault();

    if (id < 1 || id > 200) {
      setError(true);
      setId("");
      return;
    }
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const data = await res.json();
    setError(false);
    setTodo(data);
    setId("");
  };

  return (
    <section>
      <div className="lg:w-2/3 w-full mx-auto overflow mt-3">
        {/* <table className="table-auto w-full scroll-smooth text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                Id
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Title
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Completed
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td className="px-4 py-3">{todo.id}</td>
                  <td className="px-4 py-3">{todo.title}</td>
                  <td className="px-4 py-3">
                    {todo.completed ? (
                      <h1 className=" text-green-400 font-semibold">Done</h1>
                    ) : (
                      <h1 className=" text-red-400 font-semibold">None</h1>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> */}

        <form onSubmit={getData} className=" mx-3">
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            type="number"
            className=" border-2 border-black mx-2 py-1 ps-3"
          />
          <button
            type="submit"
            className=" bg-black text-white px-2 py-1 active:scale-95 duration-200"
          >
            Get Data
          </button>
        </form>
        <div className=" mx-5 my-5">
          {error && (
            <h1>
              Please enter an valid <span className=" font-bold">id.</span>{" "}
              (Example 1, 2, 3, etc ....)
            </h1>
          )}
          {todo && (
            <div>
              <h1>ID - {todo.id}</h1>
              <h1>Title - {todo.title}</h1>
              <h1>UserID - {todo.userId}</h1>
              <h1>
                Completed -{" "}
                {todo.completed ? (
                  <span>Completed</span>
                ) : (
                  <span>Not Completed</span>
                )}
              </h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default App;
