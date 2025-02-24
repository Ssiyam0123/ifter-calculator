import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from '../src/sidebar/Sidebar'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div>
      <Sidebar/>
    </div>
      <h1>hi i am from app.jsxx</h1>
    </>
  );
}

export default App;
