import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "../store/reducer/authReducer";

const Navbar = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  const logOutHandler = () => {
    return confirm(dispatch(authActions.logout()));
  };

  return (
    <nav className="flex items-center justify-between md:rounded-lg gap-2 p-2 w-full bg-blue-500 text-white">
      <h1 className="text-2xl font-bold">Redux Counter</h1>
      {isLogin && (
        <ul className="list-none">
          <li className="inline-block me-2">My Records</li>
          <li className="inline-block me-2">Profile</li>
          <li className="inline-block me-2">
            <button
              className="bg-white text-blue-500 font-medium px-2 py-1 my-3 border-0 rounded-lg outline-none active:scale-90 duration-200"
              onClick={logOutHandler}
            >
              logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
