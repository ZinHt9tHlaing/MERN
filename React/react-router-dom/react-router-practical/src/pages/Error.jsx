import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);

  const navigateHandler = () => {
    navigate("/");
  };

  return (
    <section className="w-full h-screen bg-gray-800 text-white flex justify-center items-center">
      <div className="text-center">
        <h1 className=" font-bold text-4xl mb-3">Unknown Error Occur.</h1>
        <p className=" w-96 mb-5 text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
          commodi!
        </p>
        <button
          onClick={navigateHandler}
          className=" border-2 border-white font-medium px-4 py-1 active:scale-95 hover:font-bold hover:bg-gray-200 hover:text-black duration-200"
        >
          Go back Home
        </button>
      </div>
    </section>
  );
};

export default Error;
