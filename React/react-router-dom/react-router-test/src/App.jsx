import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";

const App = () => {
  return (
    <RouterProvider router={router}>
      {/* <div className="">React Router Dom</div>; */}
    </RouterProvider>
  );
};

export default App;
