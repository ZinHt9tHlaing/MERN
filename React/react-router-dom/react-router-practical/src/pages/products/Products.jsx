import { Link } from "react-router-dom";

const PRODUCTS = [
  {
    id: 1,
    title: "Apple",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. In sed, deleniti libero iste rerum cum consequuntur nisi soluta iusto reiciendis velit itaque perspiciatis! Aut amet numquam fugit molestiae neque dignissimos!",
  },
  {
    id: 2,
    title: "Orange",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non expedita labore omnis voluptas consequuntur quod odit in quidem, eveniet exercitationem assumenda. Eveniet non, facere beatae ducimus at qui accusamus laudantium.",
  },
  {
    id: 3,
    title: "Mango",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus architecto molestias deleniti commodi veniam aspernatur! Sit quidem hic illum. Impedit sequi quibusdam unde odit necessitatibus nobis ut tempore fugit doloremque!",
  },
];

const Products = () => {
  return (
    <div>
      {PRODUCTS.map((product) => (
        <div
          key={product.id}
          className="w-[60%] md:w-[30%] mx-auto bg-blue-500 text-white p-3 rounded-[20px] mt-5 hover:ring-4 hover:ring-gray-600 duration-300"
        >
          <Link to={`/product/${product.title}`}>
            <h1 className=" text-2xl font-bold mb-3 inline-block hover:underline active:scale-95 duration-200">
              {product.title}
            </h1>
          </Link>
          <p className="text-left md:text-center">{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
