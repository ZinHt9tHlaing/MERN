import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import { About, Error, Home, ProductDetails, Products } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:title",
        element: <ProductDetails />,
      },
    ],
  },
]);

export default router;
