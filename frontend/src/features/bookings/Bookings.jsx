import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Card,
  Typography,
  message,
  Modal,
} from "antd";
import api from "../../api/api";

const { Title } = Typography;
const { Option } = Select;

export default function Bookings() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      setIsModalVisible(true);
    } else {
      setToken(userToken);
    }
  }, []);

  const handleLogin = () => {
    // Navigate to login or open login form
    console.log("Navigate to Login");
  };

  const handleRegister = () => {
    // Navigate to register or open register form
    console.log("Navigate to Register");
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      // simulate booking API call
      setTimeout(() => {
        message.success("Booking submitted successfully!");
        form.resetFields();
        setLoading(false);
      }, 1000);
    } catch (error) {
      message.error("Failed to book. Please try again." + error);
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    await api.post("/booking", data); // cleaner and centralized
  };
  
  if (!token) {
    return (
 <div>
  <h1>Successfully Submited and Login In into the SkipWithTrips.com</h1>
 </div>
    );
  }

  return (
    <div className="flex justify-center py-10 px-4 bg-white min-h-screen">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <Title level={3}>Book Your Trip</Title>
        <Form form={form} layout="vertical" onFinish={handleBooking}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="destination"
            label="Destination"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select destination">
              <Option value="goa">Goa</Option>
              <Option value="kerala">Kerala</Option>
              <Option value="manali">Manali</Option>
              <Option value="leh-ladakh">Leh-Ladakh</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="travelDate"
            label="Travel Date"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" loading={loading}>
              Confirm Booking
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
