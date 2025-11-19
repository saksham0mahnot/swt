import travelBg from "../assets/about-bg.webp"; // Replace with your background image
import { FaMapSigns } from "react-icons/fa";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AboutSection() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <section
      className="relative text-center text-white py-24 px-6 md:px-16 overflow-hidden"
      style={{
        backgroundImage: `url(${travelBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // enables parallax
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Decorative SVG Clouds */}
      <div className="absolute top-0 left-[-60px] w-48 opacity-30 animate-float z-10">
        <svg viewBox="0 0 64 32" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 24h24a12 12 0 0 0 0-24 16 16 0 0 0-31 4A10 10 0 0 0 4 14a10 10 0 0 0 10 10h6z" />
        </svg>
      </div>

      <div className="absolute top-10 right-[-50px] w-40 opacity-20 animate-float-slow z-10">
        <svg viewBox="0 0 64 32" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 24h18a10 10 0 0 0 0-20 14 14 0 0 0-26 4A8 8 0 0 0 6 14a8 8 0 0 0 8 8h8z" />
        </svg>
      </div>

      {/* Content Section */}
      <div className="relative z-20">
        {/* Heading */}
        <div className="flex justify-center items-center mb-10">
          <FaMapSigns className="text-[#ea4a0a] text-4xl md:text-5xl mr-2 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#ea4a0a] tracking-wide">
            About <span className="text-white">SkipWithTrips</span>
          </h2>
        </div>

        {/* Description */}
        <div className="max-w-5xl mx-auto text-gray-100">
          <p className="text-lg md:text-xl leading-relaxed font-[Playfair Display] mb-6">
            <strong className="text-[#ea4a0a]">SkipWithTrips</strong> is on a mission to become India’s most affordable hotel and package booking platform. We’re not just about bookings — we’re about vibe, value, and verified experiences. What sets us apart is our exclusive <strong>SWT Secure Badge</strong>, which guarantees trusted stays, verified hosts, and smooth check-ins. Every hotel or package that carries the SWT Secure Tag has passed our quality and safety standards — so our users can book with complete peace of mind.
          </p>

          <p className="text-lg text-gray-200 font-[Playfair Display] mb-4">
            We offer <strong>Gen Z Stays</strong> — handpicked accommodations that are budget-friendly, aesthetic, and social-media-worthy — along with <strong>Gen Z Trips</strong> that are fun, flexible, and curated for the younger generation’s style and pace.
          </p>

          <p className="text-lg text-gray-200 font-[Playfair Display] mb-4">
            With our <strong>SWT Secure Packages</strong>, travelers get unbeatable deals bundled with trust, support, and zero hidden charges. Our vision is to build a travel ecosystem where affordability meets experience, and where every trip is not just booked — but backed.
          </p>

          <div className="mt-10 italic text-md text-orange-300 font-semibold">
            "Don’t just dream it — skip it, trip it!"
          </div>
        </div>
      </div>
    </section>
  );
}
