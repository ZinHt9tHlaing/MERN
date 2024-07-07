import { useState } from "react";

const Form = ({ addNewMember }) => {
  const [name, setName] = useState("");
  const [live, setLive] = useState("");

  // const [info, setInfo] = useState({
  //   name: "",
  //   live: "",
  // });

  const trackName = (e) => {
    // setInfo({
    //   ...info, // *TODO: info ထဲက အရင် object အဟောင်းကိုပြန်ယူတာ
    //   name: e.target.value, // *TODO: အဟောင်းထဲကဟာကို overwrite ပြန်လုပ်တာ
    // });

    // setInfo((prevState) => {
    //   return {...prevState,name: e.target.value}
    // })
    setName(e.target.value);
  };

  const trackLive = (e) => {
    // setInfo({
    //   ...info, // *TODO: info ထဲက အရင် object အဟောင်းကိုပြန်ယူတာ
    //   live: e.target.value, // *TODO: အဟောင်းထဲကဟာကို overwrite ပြန်လုပ်တာ
    // });

    // setInfo((prevState) => {
    //   return {...prevState,live: e.target.value}
    // })
    setLive(e.target.value);
  };

  const showData = (e) => {
    e.preventDefault();

    const data = {
      name,
      live,
    };

    addNewMember(data);

    setName("");
    setLive("");
  };

  return (
    <form
      onSubmit={showData}
      className=" mt-5 flex justify-center items-center"
    >
      <div>
        <input
          type="text"
          className="block px-3 py-1 mb-3 w-44 md:w-auto text-lg rounded border-2 border-gray-500"
          placeholder="name"
          value={name}
          onChange={trackName}
        />
        <input
          type="text"
          className="block px-3 py-1 mb-3 w-44 md:w-auto text-lg rounded border-2 border-gray-500"
          placeholder="live"
          value={live}
          onChange={trackLive}
        />
        <button
          type="submit"
          className="bg-black text-white w-full text-sm rounded px-3 py-2 hover:bg-gray-700 active:scale-95 duration-300"
        >
          Add New Number
        </button>
      </div>
    </form>
  );
};

export default Form;
