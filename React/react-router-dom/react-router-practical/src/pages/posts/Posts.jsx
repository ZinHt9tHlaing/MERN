import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import User from "../../components/User";
import { json } from "react-router-dom";

export const loader = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw json({ message: "Can't get posts now." }, { status: 500 });
  } else {
    const products = await res.json();
    return products;
  }
};

const Products = () => {
  const products = useLoaderData();

  return (
    <div>
      {products.map((product) => (
        <div
          key={product.id}
          className="w-[60%] md:w-[45%] mx-auto text-center bg-blue-500 text-white p-3 rounded-[20px] mt-5 hover:scale-105 hover:ring-2 hover:ring-gray-600 -transition-all duration-300"
        >
          <Link to={`/post/${product.id}`}>
            <h1 className=" font-bold text-gray-100 hover:underline active:scale-95 duration-200">{product.title}.</h1>
          </Link>
            <User userID={product.userId} />
        </div>
      ))}
    </div>
  );
};

export default Products;
