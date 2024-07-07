import { useState } from "react";

const Students = (props) => {
  let live = props.live;
  const [name, setName] = useState(props.name);

  return (
    <ul className="mb-2 bg-gray-700 w-44 p-3 rounded-lg text-white hover:scale-105 hover:shadow-lg duration-300">
      <li>
        <div>
          <h1>
            {" "}
            name :{" "}
            <p className=" inline-block text-yellow-400 font-bold hover:scale-105 duration-300">
              {name.toUpperCase()}
            </p>
          </h1>
          <p>live : {live.toUpperCase()}</p>
        </div>
      </li>
    </ul>
  );
};

export default Students;
