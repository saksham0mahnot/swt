import { Typography } from "antd";
import { useOutletContext } from "react-router-dom";

import ItineraryGuide from "../components/ItineraryGuide";
// import PopularDestinations from "../components/popularDestionation ";
import CarouselContainer from "../components/carouselContainer";
import BookingForm from "../components/bookingForm";
import AboutSection from "../components/aboutSection";
// import ContactSection from "../components/contactSection";
import CountdownTimer from "../components/countdown";
import GenZ_poster from "../components/genZposter";
import PackagesSection from "../components/packagesSection";
import LandingDestination from "../components/landingDestination";

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const { onBookNowClick } = useOutletContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Home Section */}
      <section id="home">
        {/* Hero Carousel */}
        <CountdownTimer />
        <GenZ_poster />
        {/* <CarouselContainer onBookNowClick={onBookNowClick} /> */}
        <BookingForm />
        <PackagesSection />
        <LandingDestination />
        {/* <PopularDestinations /> */}
        {/* <ContactSection /> */}

        {/* About Section */}
        {/* <AboutSection /> */}
        {/* <div className="container mx-auto "> */}
        {/* Popular Destinations */}
        {/* <ItineraryGuide /> */}
        {/* Contact Section */}
      </section>
    </div>
  );
}
