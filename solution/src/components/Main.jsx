import React from "react";
import FormBox from "./FormBox";
import List from "./List";
import { useState } from "react";

const Main = () => {
  const [userInfos, setUserInfos] = useState([]);

  const getUserInfo = (userInfoObj) => {
    console.log(userInfoObj);
    setUserInfos([...userInfos, userInfoObj]);
  };

  return (
    <section className=" w-[65%] md:w-[35%] mx-auto p-5">
      <FormBox getUserInfo={getUserInfo} />
      <List userInfos={userInfos} />
    </section>
  );
};

export default Main;
