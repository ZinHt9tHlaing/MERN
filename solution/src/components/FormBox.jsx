import { useState } from "react";
import Card from "./Card";

const FormBox = ({ getUserInfo }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [live, setLive] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      live.trim().length === 0
    ) {
      return window.alert("Please fill a invalid value for all inputs.");
    }

    const userInfo = {
      name,
      live,
      email,
    };

    getUserInfo(userInfo);
    setName("");
    setEmail("");
    setLive("");
  };

  return (
    <Card>
      <form onSubmit={formSubmit} className="bg mb-8">
        <div className=" mb-2 bg-[#fff]">
          <label htmlFor="name" className="block text-lg font-bold">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" w-full rounded-md border border-gray-700 px-2 py-1 mt-1 focus-visible:outline-none focus:border-2 focus:border-gray-300 focus:bg-blue-100 duration-100"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block text-lg font-bold">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" w-full rounded-md border border-gray-700 px-2 py-1 mt-1 focus-visible:outline-none focus:border-2 focus:border-gray-300 focus:bg-blue-100 duration-100"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="live" className="block text-lg font-bold">
            Live
          </label>
          <input
            type="text"
            id="live"
            value={live}
            onChange={(e) => setLive(e.target.value)}
            className=" w-full rounded-md border border-gray-700 px-2 py-1 mt-1 focus-visible:outline-none focus:border-2 focus:border-gray-300 focus:bg-blue-100 duration-100"
          />
        </div>
        <button type="submit" className="btn mt-2">
          Add User
        </button>
      </form>
    </Card>
  );
};

export default FormBox;
