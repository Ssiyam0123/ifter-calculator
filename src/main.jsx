import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./sidebar/Home/Home.jsx";
import Settings from "./sidebar/Settings/Settings.jsx";
import Calculator from "./Calculator/Calculator.jsx";
import CreateGroupForm from "./utils/CreateGroupFrom.jsx";
import { param } from "framer-motion/client";
import GroupInfo from "./groupinfo/GroupInfo.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="createGroup" element={<CreateGroupForm />} />
          <Route path="setting" element={<Settings />} />
          <Route path="groupInfo" element={<GroupInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
