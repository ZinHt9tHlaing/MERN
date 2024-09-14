import { useLoaderData } from "react-router-dom";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import User from "../../components/User";

export const loader = async ({ request, params }) => {
  // console.log(params);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );

  if (!res.ok) {
    throw json({ message: "Can't find your post." }, { status: 500 });
  } else {
    const data = await res.json();
    // console.log(data);
    return data;
  }
};

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id, body, title, userId } = useLoaderData();

  const navigateHandler = () => {
    navigate("/posts");
  };

  return (
    <div>
      <h1 className=" text-3xl font-bold">Post Details Page</h1>
      <h3 className="my-3 text-lg">
        Post title - <span className="font-semibold">{title}.</span>
      </h3>
      <User userID={userId} />
      <p>{body}</p>
      <button
        onClick={navigateHandler}
        className="px-2 py-1 mt-2 text-lg bg-blue-600 text-white rounded-md active:scale-95 duration-200"
      >
        Go back to Posts
      </button>
    </div>
  );
};

export default ProductDetails;
