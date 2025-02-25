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
import AdminDashboard from "./utils/AdminDashboard.jsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AuthProvider from "./context/AuthProvider.jsx";
import HomePage from "./sidebar/Home/HomePage.jsx";
import ExpenseChart from "./utils/ExpenseChart.jsx";
import GroupTable from "./utils/GroupTable.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<AdminDashboard />}>
              <Route path="dashboard" element={<ExpenseChart />} />
              <Route path="users" element={<CreateGroupForm />} />
              <Route path="table" element={<GroupInfo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
