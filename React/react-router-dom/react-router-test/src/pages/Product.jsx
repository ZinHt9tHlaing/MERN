import { useParams } from "react-router-dom";

const Product = () => {
const { id } = useParams();
  return (
    <div>
      <h1>I am dynamic route</h1>
      <p>ID is - {id}</p>
    </div>
  );
};

export default Product;
