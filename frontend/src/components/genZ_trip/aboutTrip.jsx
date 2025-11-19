// import { FaTrain, FaPlaneDeparture,FaTicketAlt, FaChalkboardTeacher, FaParachuteBox, FaCampground,FaWallet ,FaMoneyBillWave ,FaMountain, } from "react-icons/fa";
// import React, { useState, useEffect } from "react";
import profileSvg from "../../assets/genZ_trip/profile.svg";

const AboutTrip = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 max-[505px]:!pb-2 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Text Content */}
        <div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            About the Trip
          </h2>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-6 text-xl">
              SkipWithTrips is on a mission to become India’s most affordable
              hotel booking platform . We’re not just about bookings — we’re
              about vibe, value, and verified experiences. What sets us apart is
              our exclusive SWT Secure Badge, which guarantees trusted stays,
              verified hosts, and smooth check-ins. Every hotel or package that
              carries the SWT Secure Tag has passed our quality and safety
              standards — so our users can book with complete peace of mind.
            </p>
            <p className="mb-6 text-xl">
              We offer Gen Z Stays — handpicked accommodations that are
              budget-friendly, aesthetic, and social-media-worthy — along with
              Gen Z Trips that are fun, flexible, and curated for the younger
              generation’s style and pace. With our SWT Secure Packages,
              travelers get unbeatable deals bundled with trust, support, and
              zero hidden charges. Our vision is to build a travel ecosystem
              where affordability meets experience, and where every trip is not
              just booked — but backed.
            </p>{" "}
            <p className="mb-6 text-xl">
              That's why we say Don't just Dream it - Skip it,Trips it!
            </p>
            <button
              onClick={() => (window.location.href = "/register")}
              className="bg-orange-500 text-white px-5 py-2.5 rounded-full hover:bg-orange-600 transition-colors font-medium text-base"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={profileSvg}
            alt="Mountain Art"
            className="w-102 h-102 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutTrip;
