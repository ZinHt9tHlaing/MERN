import { useState } from "react";
import Card from "./Card";
import { useRef } from "react";

const FormBox = ({ getUserInfo }) => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const liveInputRef = useRef();

  const formSubmit = (e) => {
    e.preventDefault();
    if (
      nameInputRef.current.value.trim().length === 0 ||
      emailInputRef.current.value.trim().length === 0 ||
      liveInputRef.current.value.trim().length === 0
    ) {
      return window.alert("Please fill a invalid value for all inputs.");
    }

    const userInfo = {
      name: nameInputRef.current.value,
      live: emailInputRef.current.value,
      email: liveInputRef.current.value,
    };

    getUserInfo(userInfo);

    nameInputRef.current.value = "";
    emailInputRef.current.value = "";
    liveInputRef.current.value = "";
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
            ref={nameInputRef}
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
            ref={emailInputRef}
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
            ref={liveInputRef}
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
