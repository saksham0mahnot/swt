import { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

import HeaderSection from "../components/headerSection";
import LoginBox from "../features/loginBox";
import FooterSection from "../components/footerSection";

const { Content } = Layout;

const MainLayout = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    setIsModalVisible(true);
  };

  const handleLoginSuccess = () => {
    setIsModalVisible(false);
    navigate("/genZtrip");
  };



  return (
    <AuthProvider>
      <Layout className=" min-h-screen ">
        <div className="fixed top-0 inset-x-0 z-[1000] bg-gradient-to-r from-orange-600 via-rose-500 to-pink-600 text-white shadow-md rounded-b-2xl">
          <div className="max-w-screen-xl mx-auto px-3 md:px-4 py-2 md:py-3 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap text-center md:text-left">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs md:text-sm font-semibold tracking-wide uppercase">Portfolio Demo</span>
              <p className="text-sm md:text-base font-medium">I completed an internship building this site. The live site is currently not available at <span className="font-semibold underline decoration-white/60 ml-1">skipwithtrip.com</span>.</p>
            </div>
            <div className="flex items-center gap-2.5">
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); navigate('/'); }}
                className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs md:text-sm font-semibold no-underline !text-white visited:!text-white hover:!text-white focus:!text-white bg-white/10 backdrop-blur-sm ring-1 ring-white/40 shadow-sm transition duration-200 ease-out will-change-transform hover:bg-white/20 hover:ring-white/80 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90"
                aria-label="Open Visual/Code link"
              >
                Visual / Code
              </a>
              <a
                href="/prototype"
                onClick={(e) => { e.preventDefault(); navigate('/prototype'); }}
                className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs md:text-sm font-semibold no-underline !text-white visited:!text-white hover:!text-white focus:!text-white bg-white/10 backdrop-blur-sm ring-1 ring-white/40 shadow-sm transition duration-200 ease-out will-change-transform hover:bg-white/20 hover:ring-white/80 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90"
                aria-label="Open Prototype/Figma link"
              >
                Prototype / Figma
              </a>
            </div>
          </div>
        </div>
        <div className="h-12 md:h-14"></div>
        {/* Header */}
        <HeaderSection onBookNowClick={handleBookNowClick} />
        {/* Content */}
        <Content className="  pt-auto bg-white">
          <Outlet context={{ onBookNowClick: handleBookNowClick }} />
        </Content>
        {/* Footer */}
        <FooterSection />
        <LoginBox
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSuccess={handleLoginSuccess}
        />
      </Layout>
    </AuthProvider>
  );
};

export default MainLayout;
