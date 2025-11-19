import React from "react";
import BG from "../assets/bg.webp";
import payment from "../assets/money.webp";
import assured from "../assets/quality.webp";
import discount from "../assets/discount.webp";
import plane from "../assets/3-removebg-preview 1.png"; // decorative bottom image

const DealsSection = () => {
  return (
    <div className="relative z-20 py-12 h-full overflow-hidden">
      {/* Background Lines Image */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center mt-10 pt-4">
        <h2 className="text-3xl md:text-4xl font-bold italic text-red-800 text-center mb-10">
          SWT Secure Deals for you
        </h2>

        {/* Offer Cards */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 px-4">
          {/* Card Template */}
          {[ 
            {
              img: payment,
              alt: "₹0 Payment",
              text: <>Book with <span className="font-bold">₹0 payment</span></>,
            },
            {
              img: discount,
              alt: "Discount",
              text: <>Upto <span className="font-bold">70% off</span> on Hotels</>,
            },
            {
              img: assured,
              alt: "SWT Assured",
              text: <><span className="font-bold">SWT</span> assured</>,
            },
          ].map(({ img, alt, text }, index) => (
            <div
              key={index}
              className="flex items-center gap-3 w-[300px] p-4 border-2 border-orange-500 rounded-2xl bg-white shadow-sm"
            >
              <img src={img} alt={alt} className="w-10 h-10 object-contain" />
              <div className="text-md md:text-lg font-medium flex-1">{text}</div>
            </div>
          ))}
        </div>

        {/* Decorative Bottom Image */}
        <div className="mt-12 flex justify-center">
          <img
            src={plane}
            alt="Plane Decor"
            className="max-w-full sm:max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default DealsSection;