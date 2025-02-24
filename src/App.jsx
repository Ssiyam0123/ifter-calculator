import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "../src/sidebar/Sidebar";
import { div } from "framer-motion/client";
import { Outlet } from "react-router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-between">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="w-[75%]">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
