import React, { useContext } from "react";
import { Button, Typography, Card } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router";

const { Title, Text } = Typography;

const HomePage = () => {
  const { user, signInWithGoogle } = useContext(AuthContext); // Destructure from AuthContext

  return (
    <div className="home-page-container flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="text-center p-8 shadow-md" style={{ width: 400 }}>
        <Title level={2}>Welcome to Your Daily Expense App!</Title>
        <Text className="block mb-4">Track your expenses and manage your daily costs efficiently.</Text>
        {!user ? (
          <>
            <Button
              type="primary"
              icon={<LoginOutlined />}
              size="large"
              onClick={signInWithGoogle}
              className="w-full"
            >
              Log In with Google
            </Button>
            <Text className="block mt-4 text-gray-600">Please log in to get started.</Text>
          </>
        ) : (
          <>
            <Text className="block mb-4">You are already logged in as {user.name}.</Text>
            {/* You can redirect the user to the dashboard or profile page */}
            <Link to={'dashboard'}>
            <Button type="link" >
              Go to Dashboard
            </Button>
            </Link>
          </>
        )}
      </Card>
    </div>
  );
};

export default HomePage;
