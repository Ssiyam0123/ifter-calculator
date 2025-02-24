import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./sidebar/Home/Home.jsx";
import Settings from "./sidebar/Settings/Settings.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />}>
          {/* <Route index element={<App />} /> */}
          <Route path="home" element={<Home />} />
          <Route path="setting" element={<Settings />} />
        </Route>
        {/* <Route index element={<App />} />
        <Route path="home" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
