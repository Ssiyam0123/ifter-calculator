import { useState } from "react";
import { Menu, Layout } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { Header, Sider, Content } = Layout;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const sampleData = [
    { date: "2025-02-20", expense: 50 },
    { date: "2025-02-21", expense: 70 },
    { date: "2025-02-22", expense: 40 },
    { date: "2025-02-23", expense: 90 },
    { date: "2025-02-24", expense: 60 },
    { date: "2025-02-25", expense: 75 },
    { date: "2025-02-26", expense: 65 },
    { date: "2025-02-27", expense: 85 },
    { date: "2025-02-28", expense: 45 },
    { date: "2025-03-01", expense: 95 },
    { date: "2025-03-02", expense: 55 },
    { date: "2025-03-03", expense: 70 },
    { date: "2025-03-04", expense: 60 },
    { date: "2025-03-05", expense: 80 },
    { date: "2025-03-06", expense: 50 },
    { date: "2025-03-07", expense: 90 },
    { date: "2025-03-08", expense: 65 },
    { date: "2025-03-09", expense: 75 },
    { date: "2025-03-10", expense: 85 },
    { date: "2025-03-11", expense: 55 },
    { date: "2025-03-12", expense: 95 },
    { date: "2025-03-13", expense: 60 },
    { date: "2025-03-14", expense: 70 },
    { date: "2025-03-15", expense: 80 },
    { date: "2025-03-16", expense: 45 },
  ];
export default function ExpenseChart() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const filteredData = sampleData.filter(
    (item) => dayjs(item.date).isSame(selectedDate, "month")
  );

  return (
    <div className="mt-6 ml-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daily Expense Chart</h2>
        <DatePicker
          picker="month"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="expense" fill="#8884d8" barSize={40} />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="text-lg font-semibold mt-8">Expense Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={filteredData}
            dataKey="expense"
            nameKey="date"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {filteredData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}