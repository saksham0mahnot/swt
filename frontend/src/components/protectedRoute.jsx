import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginBox from "../features/loginBox";

const ProtectedRoute = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem("userData");
      const token = localStorage.getItem("userToken");

      if (userData && token) {
        setIsAuthenticated(true);
      } else {
        setIsModalVisible(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsModalVisible(false);
    setIsAuthenticated(true);
    // User stays on the registration page after successful login
  };

  const handleModalClose = () => {
    // Only navigate to home if user is not authenticated (i.e., they cancelled)
    if (!isAuthenticated) {
      setIsModalVisible(false);
      navigate("/");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <LoginBox
        isVisible={isModalVisible}
        onClose={handleModalClose}
        onSuccess={handleLoginSuccess}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
