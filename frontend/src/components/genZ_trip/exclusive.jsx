// import { FaTrain, FaPlaneDeparture,FaTicketAlt, FaChalkboardTeacher, FaParachuteBox, FaCampground,FaWallet ,FaMoneyBillWave ,FaMountain, } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import {
  FaPlaneDeparture,
  FaTicketAlt,
  FaParachuteBox,
  FaWallet,
  FaCampground,
  FaMoneyBillWave,
} from "react-icons/fa";

const exclusions = [
  {
    icon: <FaPlaneDeparture size={50} />,
    title: "Air/Rail Fare Not Included",
    desc: "Flights and train travel are not part of the package. However, your Delhi–Manali–Delhi Volvo bus is fully covered!",
  },
  {
    icon: <FaTicketAlt size={50} />,
    title: "Entrance & Guidance Fees Not Included",
    desc: "Entry tickets, guide charges, and travel insurance are excluded from the base price.",
  },
  {
    icon: <FaParachuteBox size={50} />,
    title: "Activities Not Included",
    desc: "Optional adventures like rafting or paragliding aren’t part of the base cost — feel free to join in at your own pace and expense.",
  },
  {
    icon: <FaWallet size={50} />,
    title: "Personal Expenses Not Included",
    desc: "Shopping, café visits, extra snacks, laundry, room heaters, drinks, and other personal spends are not covered. Basically, if it’s for you and not the group — it’s on you!",
  },
  {
    icon: <FaCampground size={50} />,
    title: "No Calamity Cover",
    desc: "Costs due to natural events like landslides, roadblocks, or strikes are not covered and must be borne by the guest.",
  },
  {
    icon: <FaMoneyBillWave size={50} />,
    title: "Other Charges",
    desc: "Any extras not listed in the inclusions like, luggage fees, special requests, or miscellaneous add-ons aren’t covered.",
  },
];

const ExclusiveSection = () => {
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
      {/* 🔝 Thin black line at the top */}
      <div className="w-full h-[1.5px] bg-black absolute top-0 left-0 z-5" />

      <div className="bg-white px-6 py-12 md:py-20 text-center mt-[2px]">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Exclusive</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          To keep your experience flexible, certain optional activities and
          personal expenses are not part of the base package. Please refer to
          the list below for anything you’ll need to plan separately.
        </p>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {exclusions.map((item, index) => (
            <div
              key={index}
              className="border border-orange-300 rounded-xl overflow-hidden shadow-sm"
            >
              {/* Icon + Title Section */}
              <div className="bg-white px-4 py-6 flex flex-col items-center text-center max-[450px]:flex-row max-[450px]:text-left max-[450px]:items-start max-[450px]:gap-4 max-[450px]:px-3 max-[450px]:py-4">
                <div className="text-orange-500 mb-7 max-[450px]:mb-0 max-[450px]:text-4xl max-[450px]:min-w-[40px] max-[316px]:mt-2">
                  {React.cloneElement(item.icon, {
                    size: isSmallScreen ? 40 : 80,
                  })}

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

export default ExclusiveSection;
