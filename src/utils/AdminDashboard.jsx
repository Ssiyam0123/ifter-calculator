import { useState } from "react";
import { Menu, Layout } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);

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
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="bg-white shadow px-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
        </Header>
        <Content className="m-4 p-4 bg-white rounded shadow min-h-[80vh]">
          <h2 className="text-xl font-medium">Welcome to the Admin Dashboard!</h2>
          <p className="mt-2 text-gray-600">Manage your application settings, users, and more.</p>
        </Content>
      </Layout>
    </Layout>
  );
}
