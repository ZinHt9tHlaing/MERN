import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/products");
  };

  return (
    <div>
      <h1 className=" text-2xl font-bold">Product Details Page</h1>
      <p className="my-3">
        Product title - <span className="font-semibold">{title}</span>
      </p>
      <button
        onClick={navigateHandler}
        className="px-2 py-1 mt-2 text-lg bg-black text-white rounded-md active:scale-95 duration-200"
      >
        Go back to products
      </button>
    </div>
  );
};

export default ProductDetails;
