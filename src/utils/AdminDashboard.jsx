import { useContext, useState } from "react";
import { Menu, Layout } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined,
  HomeOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import ExpenseChart from "./ExpenseChart";
import { AuthContext } from "../context/AuthProvider";
import HomePage from "../sidebar/Home/HomePage";
import { Outlet, useNavigate } from "react-router";
import { BarChart2Icon } from "lucide-react";

const { Header, Sider, Content } = Layout;

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, signInWithGoogle, logOut } = useContext(AuthContext);
  const navigate = useNavigate()
  console.log(name);

  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="bg-gray-800"
      >
        <div className="text-white text-center py-4 text-xl font-bold">
          {collapsed ? "AD" : "Admin Dashboard"}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" onClick={()=>navigate('home')} icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          {user && (
            <Menu.Item onClick={()=> navigate('stats')} key="2" icon={<BarChart2Icon />}>
              Stats
            </Menu.Item>
          )}
          <Menu.Item key="3" onClick={()=>navigate('table')} icon={<ProfileOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item onClick={user? logOut : signInWithGoogle}
            key="4"
            icon={user ? <LogoutOutlined /> : <LoginOutlined />}
          >
            {user ? "Logout" : "LogIn"}
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header className="bg-white shadow px-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
        </Header>
        <Content className="m-4 p-4 bg-white rounded shadow min-h-[80vh]">
          <h2 className="text-xl font-medium">Welcome to the Admin Dashboard!</h2>
          <p className="mt-2 text-gray-600">Manage your application settings, users, and more.</p>
        </Content> */}
        {/* <ExpenseChart /> */}
        {/* <HomePage/> */}
        <Outlet/>
      </Layout>
    </Layout>
  );
}
