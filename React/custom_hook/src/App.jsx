import useToggle from "./hooks/useToggle";

const App = () => {
  const [isShow, toggle] = useToggle(true);

  return (
    <section>
      <button onClick={toggle}>{isShow ? "Hide" : "Show"}</button>
      {isShow && <h1>Component is showing.</h1>}
    </section>
  );
};

export default App;
