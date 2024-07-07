import { useState } from "react";
import Form from "./components/One/Form";
import Students from "./components/One/Students";

const App = () => {
  const [students, setStudents] = useState([
    {
      name: "zin htet",
      live: "ygn",
    },
    {
      name: "jue jue",
      live: "ygn",
    },
    {
      name: "zhh",
      live: "ygn",
    },
  ]);

  const addNewMember = (memInfo) => {
    setStudents([...students, memInfo]);
  };

  let contentSection = (
    <h1 className=" text-2xl font-bold mb-3 hover:scale-105 duration-300">
      No member yet!
    </h1>
  );

  if (!students.length < 1) {
    contentSection = (
      <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-3">
        {students.map(({ name, live }, i) => (
          <div key={i}>
            <Students name={name} live={live} />
          </div>
        ))}
      </section>
    );
  }

  return (
    <div className=" m-6">
      <div className="flex justify-center">{contentSection}</div>
      <div>
        <Form addNewMember={addNewMember} />
      </div>
    </div>
  );
};

export default App;
