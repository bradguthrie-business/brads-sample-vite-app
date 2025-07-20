import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div className="card-text">
          This is a sample Vite app built with React.
        </div>
        <div className="card-text">
          This is intended to showcase my modern React skills, including
          reusable components, hooks, state, and more.
        </div>
      </div>
    </>
  );
}

export default App;
