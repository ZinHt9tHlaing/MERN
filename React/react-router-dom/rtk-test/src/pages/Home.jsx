import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    setTimeout(() => {
      navigate("/products");
    }, 3000);
  };

  return (
    <div className="text-center">
      <h1 className=" text-4xl font-bold">I am HomePage.</h1>
      <button
        onClick={navigateHandler}
        className="px-2 py-1 mt-2 text-lg bg-black text-white rounded-md active:scale-95 duration-200"
      >
        Go to Products
      </button>
    </div>
  );
};

export default Home;
