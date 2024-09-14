import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import { About, Error, Home, ProductDetails, Products } from "../pages";
import { loader as productLoader } from "../pages/posts/Posts";
import { loader as productDetailLoader } from "../pages/posts/PostDetails";

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
        path: "/posts",
        element: <Products />,
        loader: productLoader,
      },
      {
        path: "/post/:postId",
        element: <ProductDetails />,
        loader: productDetailLoader,
      },
     
    ],
  },
]);

export default router;
