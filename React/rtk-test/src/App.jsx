import { useSelector } from "react-redux";
import Counter from "./components/Counter";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";

const App = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <div className=" px-1 md:px-10 md:m-auto md:w-[80%] text-center">
      <Navbar />
      {!isLogin && <Welcome />}
      {isLogin && <Counter />}
    </div>
  );
};

export default App;
