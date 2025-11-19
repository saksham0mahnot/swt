import React, { useState, useEffect } from "react";
import {
  FaHotel,
  FaBus,
  FaUtensils,
  FaReceipt,
  FaUserTie,
  FaMapMarkedAlt,
  FaMountain,
} from "react-icons/fa";

const inclusions = [
  {
    icon: <FaHotel size={80} />,
    title: "Accommodation Included",
    desc: "Accommodation in Manali Hotels for 3 Days 2 Nights. Beautiful scenery, comfortable rooms, enjoy bonfire and music with your friends!",
  },
  {
    icon: <FaBus size={80} />,
    title: "Transportation Included",
    desc: (
      <>
      <p className="text-center font-bold">Delhi &#8594; Manali &#8594; Delhi</p>
      <p>Enjoy a smooth ride with Super Deluxe A/C Volvo buses both ways, Delhi to Manali and back.</p>
      </>
    ),
},
  {
    icon: <FaUtensils size={80}  />,
    title: "Meals Included",
    desc: "Wake up to breakfast and end your day with a hearty dinner, both included during your stay.",
  },
  {
    icon: <FaReceipt size={80} />,
    title: "Taxes Included",
    desc: "No hidden costs here. All applicable hotel, transport, and service taxes are covered in the package. You focus on the trip, we’ll handle the fine print.",
  },
  {
    icon: <FaUserTie size={80} />,
    title: "Driver Tax & Toll Included",
    desc: "Driver allowance, toll tax, and parking fees? All taken care of. Sit back and chill.",
  },
  {
    icon: <FaMapMarkedAlt size={80} />,
    title: "Complimentary Tours Included",
    desc: "From cultural spots to exciting adventure and fun group activities, enjoy a mix of experiences included with your trip, no extra charges.",
  },
  {
    icon: <FaMountain size={80} />,
    title: "Atal Tunnel & Sissu (Spiti Valley)",
    desc: (
      <>
      <p>The Atal Tunnel & Sissu (Spiti Valley) experience is available at an <strong> additional charge of ₹2,000</strong>
       . Trust us, the views are totally worth it!</p>
      </>
    ),
  },
];

const InclusiveSection = () => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 450);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className="relative">
      {/* 🔥 Black line at the extreme top of the page */}
      <div className="w-full h-[1.5px] bg-black absolute left-0 z-5" />

      {/* Main Content */}
      <div className="bg-white px-6 py-12 md:py-20 text-center mt-[2px]">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Inclusive</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Your travel package has been thoughtfully designed to cover all the essentials. From
          comfortable stays and transportation to meals and guided tours—everything listed below is
          included in your plan.
        </p>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
        {inclusions.map((item, index) => (
          <div
            key={index}
            className={`border border-orange-300 rounded-xl overflow-hidden shadow-sm ${
              index === 6 ? "bg-orange-100 col-span-full lg:col-span-1 lg:col-start-2" : ""
            }`}
          >
                {/* Top white section */}
          <div className="bg-white px-4 py-6 flex flex-col items-center text-center max-[450px]:flex-row max-[450px]:text-left max-[450px]:items-start max-[450px]:gap-4 max-[450px]:px-3 max-[450px]:py-4">
              <div className="text-orange-500 mb-7 max-[450px]:mb-0 max-[450px]:text-4xl max-[450px]:min-w-[40px] max-[316px]:mt-2">
                {React.cloneElement(item.icon, { size: isSmallScreen ? 40 : 80 })}

                {/* {React.cloneElement(item.icon, { size: 40 })} Override size for small screens */}
              </div>
              <div>
                <h3 className="text-xl max-[450px]:text-base max-[450px]:mt-2 font-semibold text-black">
                  {item.title}
                </h3>
                <div className="text-gray-700 text-sm max-[450px]:text-xs mt-2 block lg:hidden">
                  {/* Optional: Short description preview for small screens */}
                </div>
            </div>
          </div>


                {/* Bottom colored section */}
              <div className="bg-[#ffe0d2] h-full px-5 py-4 text-base text-gray-800 text-left rounded-b-xl max-[450px]:text-sm">
                {item.desc}
              </div>

            </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default InclusiveSection;
