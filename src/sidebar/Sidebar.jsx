import { useState } from "react";
import { Home, Calculator, Settings } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [active, setActive] = useState("home");

  const menuItems = [
    { name: "Home", icon: <Home size={20} />, key: "home" },
    { name: "Calculator", icon: <Calculator size={20} />, key: "calculator" },
    { name: "Settings", icon: <Settings size={20} />, key: "settings" },
  ];

  return (
    <motion.div 
      initial={{ x: -200 }} 
      animate={{ x: 0 }} 
      className="h-screen w-64 bg-gray-800 text-white p-4 shadow-2xl rounded-r-2xl"
    >
      <h2 className="text-2xl font-bold mb-6">Iftar Calculator</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.key}>
            <button
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-base transition-colors ${
                active === item.key ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={() => setActive(item.key)}
            >
              {item.icon}
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
