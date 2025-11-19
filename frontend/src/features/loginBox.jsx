import { useState } from "react";
import { Modal, Button, Tabs, Form, Input, Checkbox, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import api from "../api/api"; // Adjust the path if your api.js/ts file is elsewhere

const carouselItems = [
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
    title: "Mountain Adventure",
    description:
      "Discover breathtaking peaks and pristine wilderness on our guided mountain expeditions.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
    title: "Ocean Paradise",
    description:
      "Dive into crystal-clear waters and explore vibrant coral reefs in tropical destinations.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop",
    title: "Forest Retreat",
    description:
      "Reconnect with nature in serene forest sanctuaries and peaceful hiking trails.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=600&fit=crop",
    title: "City Escape",
    description:
      "Experience the thrill of urban exploration in bustling metropolises around the world.",
  },
];

export default function LoginBox({ isVisible, onClose, onSuccess }) {
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Update the URLs in handleLogin and handleRegister
  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const response = await api.post("/api/web/user/auth/login", {
        email: values.email,
        password: values.password,
      });

      if (response.data.status) {
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        message.success("Login successful!");
        loginForm.resetFields();
        onSuccess?.();
        onClose();
      } else {
        message.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values) => {
    const { name, email, password, confirmPassword } = values;

    try {
      setLoading(true);
      const response = await api.post("/api/web/user/auth/register", {
        name,
        email,
        password,
        confirmPassword,
        phone_number: null, // Add this as it's expected by the backend
        role: "USER", // Add default role
      });

      if (response.data.status) {
        message.success("Registration successful!");
        setActiveTab("login"); // switch to login
        registerForm.resetFields();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data || error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const items = [
    {
      key: "login",
      label: "Login",
      children: (
        <Form
          form={loginForm}
          layout="vertical"
          onFinish={handleLogin}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="!bg-gradient-to-r !from-orange-600 !to-red-600 !to-orange-600 !border-none !shadow-lg !rounded-xl !px-4 sm:!px-6 !py-1 !h-8 sm:!h-10 !text-lg sm:!text-lg !font-semibold !text-white  relative overflow-hidden group"
            >
              <span className="relative z-10">Login</span>
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "register",
      label: "Register",
      children: (
        <Form
          form={registerForm}
          layout="vertical"
          onFinish={handleRegister}
          className="!mt-0"
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true }]}
            className="!mb-2"
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }, { type: "email" }]}
            className="!mb-2"
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }, { min: 6 }]}
            className="!mb-2"
          >
            <Input.Password placeholder="Create a password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            className="!mb-2"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return value && value === getFieldValue("password")
                    ? Promise.resolve()
                    : Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="!bg-gradient-to-r !from-orange-600 !to-red-600 !to-orange-600 !border-none !shadow-lg  !rounded-xl !px-4 sm:!px-6 !py-1 !h-8 sm:!h-10 !text-lg sm:!text-lg !font-semibold !text-white relative overflow-hidden group"
            >
              <span className="relative z-10">Register</span>
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      width={850}
      closable={false}
      styles={{
        content: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
        body: {
          padding: 0,
        },
      }}
    >
      <div className="flex flex-col md:flex-row rounded-3xl border-6 border-gray-200 overflow-hidden  ">
        <div className="hidden md:block w-full md:w-1/2">
          <Carousel
            arrows
            autoplay
            effect="fade"
            className="w-full"
            autoplaySpeed={5000}
            pauseOnHover={false}
            dots={{ className: "custom-dots" }}
          >
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className="relative h-[500px] overflow-hidden rounded-l-2xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <div className="container mx-auto">
                    <h2 className="text-6xl font-bold mb-3 animate-fadeIn">
                      {item.title}
                    </h2>
                    <p className="text-2xl mb-6 animate-fadeIn animation-delay-300 max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="w-full h-[500px] md:w-1/2 p-6 bg-white flex flex-col justify-center rounded-r-2xl relative">
          <div className="absolute top-4 right-4">
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={onClose}
              className=" absolute  !text-gray-500 hover:!text-gray-700 !text-lg z-10"
              size="small"
            />
          </div>

          <div className="">
            <h2 className="text-2xl font-bold text-center  text-orange-600 transition-all duration-300">
              {activeTab === "login" ? "Welcome Back" : "Create an Account"}
            </h2>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={items}
              tabBarGutter={32}
              className="custom-tabs"
              tabBarStyle={{
                marginBottom: 24,
                textAlign: "center",
                fontWeight: 600,
                fontSize: 18,
              }}
              centered
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
