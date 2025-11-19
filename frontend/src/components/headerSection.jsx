import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Drawer, Dropdown, Avatar, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import skipWithTrips from "../assets/skt.svg";
import {
  MenuOutlined,
  CloseOutlined,
  ToolFilled,
  UserOutlined,
  CalendarOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Calendar } from 'lucide-react';

const { Header } = Layout;

const HeaderSection = ({ onBookNowClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is logged in on component mount and when localStorage changes
  useEffect(() => {
    const checkUserLoggedIn = () => {
      const userData = localStorage.getItem("userData");
      const token = localStorage.getItem("userToken");

      if (userData && token) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Check on mount
    checkUserLoggedIn();

    // Listen for storage events (in case user logs in/out in another tab)
    window.addEventListener("storage", checkUserLoggedIn);

    return () => {
      window.removeEventListener("storage", checkUserLoggedIn);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    setUser(null);
    message.success("Logged out successfully");
    navigate("/");
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "my-bookings",
      icon: <CalendarOutlined />,
      label: "My Bookings",
      onClick: () => navigate("/my-bookings"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const navItems = [
    {
      key: "Gen-Z Trip",
      label: "Gen-Z Trip",
      href: "/genZtrip",
    },
    // {
    //   key: "Our Services",
    //   label: (
    //     <>
    //       <ToolFilled
    //         className="mr-2 cursor-pointer transition-all duration-300 hover:scale-105"
    //         style={{ color: "rgba(255, 64, 0, 0.8)" }}
    //       />
    //       Our Services
    //     </>
    //   ),
    //   href: "/coming_soon",
    // },
    {
      key: "Customer Support",
      label: (
        <>
          <UserOutlined
            className="mr-2 cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ color: "rgba(255, 64, 0, 0.8)" }}
          />
          Customer Support
        </>
      ),
      href: "/contact_us",
    },
  ];

  const menuStyles = `
    .custom-orange-menu.ant-menu-light.ant-menu-horizontal > .ant-menu-item-selected::after,
    .custom-orange-menu.ant-menu-light.ant-menu-horizontal > .ant-menu-submenu-selected::after {
      border-bottom: 2px solid #ea580c !important;
    }

    .custom-orange-menu.ant-menu-light.ant-menu-horizontal > .ant-menu-item-selected,
    .custom-orange-menu.ant-menu-light.ant-menu-horizontal > .ant-menu-submenu-selected {
      color: #ea580c !important;
    }

    .custom-orange-menu.ant-menu-light.ant-menu-horizontal > .ant-menu-item:hover::after,
    .custom-orange-menu.ant-menu-light.ant-menu-horizontal > .ant-menu-submenu:hover::after {
      border-bottom: 2px solid #ea580c !important;
    }

    .mobile-menu .ant-menu-item-selected {
      background-color: #fed7aa !important;
      color: #ea580c !important;
    }

    .mobile-menu .ant-menu-item:hover {
      background-color: #ffedd5 !important;
      color: #ea580c !important;
    }
  `;

  const handleMobileMenuClick = (item) => {
    window.location.href = item.href;
    setMobileMenuOpen(false);
  };

  const handleBookNowClick = () => {
    if (user) {
      message.info("You are already logged in");
      return;
    }

    if (onBookNowClick) {
      onBookNowClick();
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style>{menuStyles}</style>
      <Header
        className={`${
          location.pathname === "/genZtrip" ? "!bg-[#FEEFE8]" : "!bg-white"
        } relative !backdrop-blur-xl !shadow-lg !border-b !border-white/20 z-50 !px-4 md:!px-8 flex items-center justify-between !sticky !top-0 w-full !h-20 transition-all duration-300`}
      >
        {/* Logo Section */}
        <div className=" flex items-center h-10">
          <div className="relative group h-12">
            <Link to="/">
              <img
                src={skipWithTrips}
                alt="Skip With Trips"
                className="h-15 w-30 md:h-15 md:w-30 object-contain rounded-lg cursor-pointer transition-transform duration-300 group-hover:scale-110 bg-transparent"
              />
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        {/* <div className="hidden lg:flex items-center justify-center flex-1">
          <Menu
            mode="horizontal"
            selectedKeys={[location.hash.slice(1) || "home"]}
            className="custom-orange-menu !bg-transparent !border-none flex items-center justify-center"
            style={{
              minWidth: "560px",
              lineHeight: "64px",
              display: "flex",
              justifyContent: "center",
            }}
            items={navItems.map((item) => ({
              key: item.key,
              label: (
                <a
                  href={item.href}
                  className="relative px-6 py-2 text-orange-600 !bg-white font-medium transition-all duration-300 hover:text-orange-700 group whitespace-nowrap rounded-full border border-gray-800 hover:border-orange-300 hover:!scale-95"
                >
                  <span
                    className={`relative z-10 ${
                      (location.hash.slice(1) || "home") === item.key
                        ? "text-orange-700"
                        : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-105"></div>
                </a>
              ),
            }))}
          />
        </div> */}

        <div className="hidden lg:flex items-center justify-center flex-1 px-2">
          <Menu
            mode="horizontal"
            selectedKeys={[location.hash.slice(1) || "home"]}
            className="custom-orange-menu !bg-transparent !border-none flex flex-wrap justify-center gap-x-2"
            style={{
              lineHeight: "64px",
            }}
            items={navItems.map((item) => ({
              key: item.key,
              label: (
                <a
                  href={item.href}
                  className="relative px-6 py-2 text-orange-600 !bg-white font-medium transition-all duration-300 hover:text-orange-700 group whitespace-normal text-center rounded-full border border-gray-800 hover:border-orange-300 hover:!scale-95"
                >
                  <span
                    className={`relative z-10 ${
                      (location.hash.slice(1) || "home") === item.key
                        ? "text-orange-700"
                        : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-105"></div>
                </a>
              ),
            }))}
          />
        </div>

        {/* Desktop User Profile or Login Button */}
        <div className="hidden md:block">
          {user ? (
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
              trigger={["click"]}
            >
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <Avatar
                  size="large"
                  className="!bg-gradient-to-r !from-orange-500 !to-red-500 !text-white"
                >
                  {user.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <UserOutlined />
                  )}
                </Avatar>
                <div className="hidden lg:block">
                  <div className="text-sm font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
            </Dropdown>
          ) : (
            <Button
              type="primary"
              size="large"
              onClick={handleBookNowClick}
              className="!bg-gradient-to-r !from-orange-600 !to-red-600 !border-none !shadow-lg hover:!shadow-xl !rounded-xl !px-6 lg:!px-8 !py-2 !h-12 !font-semibold !text-white hover:!scale-105 !transition-all !duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Login / Sign Up</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuOpen(true)}
            className="!text-orange-600 !text-xl !p-2 hover:!bg-orange-50 !rounded-lg !transition-all !duration-300"
          />
        </div>
      </Header>

      {/* Mobile Menu Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img
                src={skipWithTrips}
                alt="Skip With Trips"
                className="h-16 w-30 object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-102"
              />
            </Link>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setMobileMenuOpen(false)}
              className="!text-gray-600 !text-lg"
            />
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        className="mobile-drawer"
        closable={false}
      >
        <div className="flex flex-col h-full">
          {/* User Profile in Mobile Menu */}
          {user && (
            <div className="p-4 bg-orange-50 mb-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar
                  size="large"
                  className="!bg-gradient-to-r !from-orange-500 !to-red-500 !text-white"
                >
                  {user.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <UserOutlined />
                  )}
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <Menu
            mode="vertical"
            selectedKeys={[location.hash.slice(1) || "home"]}
            className="mobile-menu !border-none flex-1"
            items={navItems.map((item) => ({
              key: item.key,
              label: (
                <div
                  onClick={() => handleMobileMenuClick(item)}
                  className=" py-1 px-1 text-lg font-medium cursor-pointer rounded-full transition-all duration-300 scale-95 hover:scale-98 hover:!text-black"
                >
                  {item.label}
                </div>
              ),
            }))}
          />

          {/* User Actions in Mobile Menu */}
          <div className="p-6 border-t border-gray-100">
            {user ? (
              <>
                <Button
                  icon={<SettingOutlined />}
                  className="w-full mb-3 !text-gray-700"
                  onClick={() => {
                    navigate("/profile");
                    setMobileMenuOpen(false);
                  }}
                >
                  Profile Settings
                </Button>

                <Button
                  icon={<CalendarOutlined />}
                  className="w-full mb-3 !text-gray-700"
                  onClick={() => {
                    navigate("/my-bookings");
                    setMobileMenuOpen(false);
                  }}
                >
                  My Bookings
                </Button>
                  

                <Button
                  type="primary"
                  danger
                  icon={<LogoutOutlined />}
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                size="large"
                onClick={handleBookNowClick}
                className="!bg-gradient-to-r !from-orange-600 !to-red-600 !border-none !shadow-lg !rounded-xl !w-full !h-12 !font-semibold !text-white hover:!scale-105 !transition-all !duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Login / Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            )}
          </div>

          {/* Contact Info (Optional) */}
          <div className="p-6 bg-gray-50 text-center">
            <div className="text-sm text-gray-600 mb-2">Need Help?</div>
            <div className="text-orange-600 font-semibold">+91 8527958951</div>
            <div className="text-gray-500 text-sm">skipwithtrips@gmail.com</div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default HeaderSection;
