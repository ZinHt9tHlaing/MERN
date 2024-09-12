import { useDispatch } from "react-redux";
import { authActions } from "../store/reducer/authReducer";

const Welcome = () => {
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(authActions.login());
  };

  return (
    <button
      className=" text-white bg-blue-500 font-medium px-2 py-1 mt-[10%] mb-3 border-0 rounded-lg outline-none active:scale-90 duration-200"
      onClick={loginHandler}
    >
      Login to redux counter
    </button>
  );
};

export default Welcome;
