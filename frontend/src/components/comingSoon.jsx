import { motion } from "framer-motion";
import { FaPlaneDeparture, FaMapMarkedAlt, FaSuitcaseRolling } from "react-icons/fa";
import localBg from "../assets/travel-coming-soon.webp"; // your local scenic image
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ComingSoon = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div
      className="w-full h-screen bg-cover bg-center relative flex items-center justify-center font-[Poppins]"
      style={{ backgroundImage: `url(${localBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Floating Icons */}
      <motion.div
        className="absolute top-10 left-8 text-white text-3xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <FaMapMarkedAlt />
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-8 text-white text-3xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3.5 }}
      >
        <FaSuitcaseRolling />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
      >
        <div className="bg-white/10 backdrop-blur-md px-8 py-10 sm:px-10 sm:py-12 rounded-2xl shadow-2xl border border-white/20 max-w-xl mx-auto">
          <FaPlaneDeparture className="text-white text-5xl mb-6 animate-bounce mx-auto" />

          <h1 className="text-white text-4xl md:text-5xl font-bold font-[Playfair] leading-tight mb-4">
            Wanderlust Vibes Loading...
          </h1>

          <p className="text-gray-200 text-base sm:text-lg mb-4">
            We’re cooking up a 🔥 travel experience — vibey stays, thrill rides & Insta-worthy memories.
            <br /> Hang tight, globetrotter! 🌍✈️
          </p>

          <p className="mt-4 italic text-orange-300 text-sm">
            “Catch flights, not feelings.” 🧡
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
