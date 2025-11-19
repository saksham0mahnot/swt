import { Button } from "antd";
import genzBg from "../assets/genZ_trip/genz.webp";
import locationIcon from "../assets/location_icon.svg";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function GenZ({ onBookNowClick }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="m-2 relative h-[375px] sm:min-h-[750px] md:min-h-[830px] lg:min-h-[850px] overflow-hidden rounded-xl select-none">
      {/* Background Image */}
      <img
        src={genzBg}
        alt="Mountain Background"
        style={{ userSelect: "none" }}
        draggable="false"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Location Badge */}
      <div className="absolute z-10 flex items-center left-4 sm:left-10 top-5 sm:top-10 text-white px-3 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-3 border-2 border-white rounded-lg px-4 py-2 sm:px-6 sm:py-3 border-r-4 border-r-orange-400 bg-black/32 backdrop-blur-md">
          <img
            src={locationIcon}
            alt="Location"
            className="w-5 h-5 sm:w-6 sm:h-6"
            draggable="false"
            style={{ userSelect: "none" }}
          />
          <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white">
            Manali, Himachal Pradesh
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute z-10 text-white px-4 sm:px-10 w-full flex flex-col justify-start md:justify-center top-[65%] md:top-[56%] lg:top-[54%] -translate-y-1 max-[640px]:-translate-y-1/2">
        <div className="max-w-[90%] sm:max-w-[75%] mb-0 ml-4 sm:ml-10">
          <h1
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 font-fasthand"
            style={{ fontFamily: "Fasthand" }}
          >
            Join Us for the
          </h1>
          <h2
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-5 pr-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Upcoming Gen-Z Trip
          </h2>
          <div className="mb-4 sm:mb-6 flex items-center">
  {/* insert the improved div here */}

          <p
  className="text-base sm:text-xl md:text-2xl mb-4 font-semibold px-4 py-2 inline-block rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white shadow-sm"
  style={{ fontFamily: '"Poppins", sans-serif' }}
>
  📅 <span className="font-bold text-white">13th–17th August, 2025</span>
</p>
  </div>
          <Button
            type="primary"
            className="!text-sm sm:!text-lg md:!text-xl !bg-gradient-to-r !from-orange-600 !to-red-600 !border-none !shadow-lg hover:!shadow-xl !rounded-xl !px-5 sm:!px-7 !py-2 sm:!py-3 !h-auto !font-bold !text-white hover:!scale-105 !transition-all !duration-300"
            onClick={onBookNowClick}
            href="/genZtrip"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
