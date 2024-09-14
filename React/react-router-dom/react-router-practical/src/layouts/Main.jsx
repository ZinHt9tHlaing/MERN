import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div className="w-7xl mx-auto text-center">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
