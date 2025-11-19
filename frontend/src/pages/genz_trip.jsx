import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import AboutTrip from "../components/genZ_trip/aboutTrip";
import ItinerarySection from "../components/genZ_trip/itinerarySection";
import InclusiveSection from "../components/genZ_trip/inclusive";
import ExclusiveSection from "../components/genZ_trip/exclusive";
import PrivacyPolicy from "../components/genZ_trip/privacyPolicy";
import ExploreSection from "../components/genZ_trip/exploreSection";
import ManaliTrip from "../components/genZ_trip/manaliTrip";
import { Button } from "antd";

function useScreenWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function GenZtrip() {
  const width = useScreenWidth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("About");

  const tabs = [
    "About",
    "Itinerary",
    "Inclusive",
    "Exclusive",
    "Cancellation Policy",
  ];

  // Refs for sections
  const aboutRef = useRef(null);
  const itineraryRef = useRef(null);
  const inclusiveRef = useRef(null);
  const exclusiveRef = useRef(null);
  const privacyRef = useRef(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const refs = {
      About: aboutRef,
      Itinerary: itineraryRef,
      Inclusive: inclusiveRef,
      Exclusive: exclusiveRef,
      "Cancellation Policy": privacyRef,
    };

    if (refs[tab]?.current) {
      const yOffset = -184; // Adjusted for main header (64px) + secondary nav (80px) heights
      const element = refs[tab].current;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Add offset to account for nav

      // Get all section positions
      const sections = {
        About: aboutRef.current?.offsetTop || 0,
        Itinerary: itineraryRef.current?.offsetTop || 0,
        Inclusive: inclusiveRef.current?.offsetTop || 0,
        Exclusive: exclusiveRef.current?.offsetTop || 0,
        "Cancellation Policy": privacyRef.current?.offsetTop || 0,
      };

      // Find the section that is currently in view
      let currentTab = "About";
      for (const [tab, position] of Object.entries(sections)) {
        if (scrollPosition >= position) {
          currentTab = tab;
        }
      }

      if (currentTab !== activeTab) {
        setActiveTab(currentTab);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <ManaliTrip />

      {/* Second Navigation - Centered */}
      <nav className="bg-white sticky top-20 z-40 shadow-md transition-all duration-300 ease-in-out backdrop-blur-sm bg-white/50 py-2">
  <div className="max-w-7xl mx-auto px-2 sm:px-6">
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 py-3">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => handleTabClick(tab)}
          className={`px-3 py-1.5 text-[11px] sm:text-sm rounded-full font-medium transition-colors duration-200
            ${
              activeTab === tab
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-800 hover:bg-orange-500 hover:text-white"
            }`} >
          {tab}
        </button>
      ))}
    </div>
  </div>
</nav>
      {/* Proceed to Checkout Button */}
      <div className="flex justify-center my-12">
        <Button
          className="!text-xl !bg-gradient-to-r !from-orange-600 !to-red-600 !border-none !shadow-lg hover:!shadow-xl !rounded-xl !px-7 sm:!px-5 !py-2.5 sm:!py-3 !h-auto !font-bold !text-white hover:!scale-105 !transition-all !duration-300 cursor-pointer"
          href="/register"
        >
          Proceed to Checkout
        </Button>
      </div>
      <div ref={aboutRef} className="mt-0">
        <AboutTrip />
      </div>
      <div ref={itineraryRef} className="mt-0">
        <ItinerarySection />
      </div>
      <div ref={inclusiveRef} className="mt-0">
        <InclusiveSection />
      </div>
      <div ref={exclusiveRef} className="mt-0">
        <ExclusiveSection />
      </div>
      <div ref={privacyRef} className="mt-0">
        <PrivacyPolicy />
      </div>
      <ExploreSection />
    </div>
  );
}
