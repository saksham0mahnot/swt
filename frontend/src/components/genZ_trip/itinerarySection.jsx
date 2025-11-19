import React from "react";
import {
  FaHotel,
  FaBus,
  FaUtensils,
  FaFire,
  FaMusic,
  FaHiking,
  FaMapMarkerAlt,
} from "react-icons/fa";

const itinerary = [
  {
    day: "Day 1",
    title: "Departure from Delhi",
    image:
      "https://images.unsplash.com/photo-1600258881099-e78a5e3b77ff?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Kashmere Gate, Bus Terminal, Gate No. 1",
    description: `Departure in the evening. The group will assemble at the pickup point. Afterwards, you will get a small briefing from the trip leader(s). Halt for dinner in between (not included).`,
  },
  {
    day: "Day 2",
    title: "Arrival in Manali",
    image:
      "https://images.unsplash.com/photo-1673499635968-e34673decc25?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Manali Bus stand - Hotel",
    description: `Arrive in Manali and check in to your riverside hotel. Explore the scenic trails of Old Manali. Later, gear up for a short hike and a visit to the beautiful Kharma Valley. Spend the evening relaxing at a café or shopping for souvenirs.`,
    extras: ["Hiking", "Kharma Valley"],
  },
  {
    day: "Day 3",
    title: "Exploring Places",
    image:
      "https://images.unsplash.com/photo-1642693373219-0540fe607261?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: `Start your day with breakfast and head out for an adventurous ride through Solang Valley, Sissu, and Atal Tunnel. Each stop will include a briefing from your trip leader(s).`,
    extras: ["Manali - Solang", "Manali - Atal Tunnel", "Manali - Sissu"],
  },
  {
    day: "Day 4",
    title: "Exploring Places",
    image:
      "https://images.unsplash.com/photo-1682693690771-2afadb405bd6?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // image: "https://images.unsplash.com/photo-1633252921060-e16bb8bc34bb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: `Visit Hadimba Temple and stroll through Mall Road. Enjoy café hopping and light activities. Unwind with music, bonfire, and company in the evening.`,
    extras: ["Manali - Hadimba (Old)", "Manali - Mall Road"],
  },
  {
    day: "Day 5",
    title: "Arrival at Delhi",
    image:
      "https://images.unsplash.com/photo-1506258850227-a9817bcc300b?q=80&w=1146&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: `Check out from hotel and board your overnight Volvo to Delhi. Reach Delhi by morning and continue your journey home.`,
  },
];

const icons = [
  { icon: <FaHotel />, label: "Accomodation" },
  { icon: <FaBus />, label: "Transportation" },
  { icon: <FaUtensils />, label: "Meals" },
  { icon: <FaFire />, label: "Bonfire" },
  { icon: <FaMusic />, label: "Music" },
  { icon: <FaHiking />, label: "Hiking" },
];

function ItinerarySection() {
  return (
    <div className="container mx-auto px-4 py-10 max-[505px]:!pt-2 max-w-6xl">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
        Itinerary
      </h2>

      <div className="flex justify-center bg-orange-100 rounded-xl py-2 max-[375px]:py-1 sm:py-6 mb-12 w-full">
        {icons.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center mx-2 max-[375px]:mx-[2px] sm:mx-4 md:mx-6"
          >
            <div className="text-sm max-[375px]:text-xs sm:text-xl md:text-2xl mb-1 sm:mb-2 text-orange-500">
              {item.icon}
            </div>
            <span className="text-[10px] max-[375px]:text-[8px] sm:text-xs md:text-sm font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-24 relative max-w-5xl mx-auto">
        {/* Vertical Timeline Line — Orange & White Alternating */}
        <div
          className="absolute left-[2.7rem] max-[768px]:left-[1.2rem] max-[375px]:left-[0.5rem] top-0 bottom-0 w-[2px] opacity-100 z-2"
          style={{
            backgroundImage: `repeating-linear-gradient(
          to bottom,
          #f97316 0px,
          #f97316 6px,
          white 6px,
          white 12px
        )`,
          }}
        ></div>

        {itinerary.map((item, index) => (
          <div
            key={index}
            className="flex flex-col pl-20 max-[768px]:pl-12 max-[375px]:pl-10 relative"
          >
            {/* Horizontal Line */}
            <div
              className="absolute top-1/2 left-[2.6rem] max-[768px]:left-[1.2rem] max-[375px]:left-[0.9rem] w-[40px] max-[768px]:w-[24px] max-[375px]:w-[20px] h-[2px] -translate-y-1/2 z-0"
              style={{
                backgroundImage: `repeating-linear-gradient(to right, #f97316 0px, #f97316 4px, white 4px, white 8px)`,
              }}
            ></div>

            {/* Circle */}
            <div
              className={`absolute left-[4.5rem] max-[768px]:left-[2.5rem] max-[375px]:left-[2rem] top-1/2 -translate-y-1/2 w-5 max-[768px]:w-4 max-[375px]:w-3 h-5 max-[768px]:h-4 max-[375px]:h-3 rounded-full shadow-md z-10 
              ${
                index === 0
                  ? "bg-white border-[3px] border-orange-500"
                  : "bg-orange-500"
              }`}
            ></div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 -mt-1">
              {item.day}
            </h3>

            <div className="w-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="w-full md:w-3/5 p-4 md:p-8">
                  <h4 className="text-xl md:text-2xl font-bold mb-4">
                    {item.title}
                  </h4>

                  {item.location && (
                    <div className="flex items-center mb-4 text-gray-600 text-sm md:text-base">
                      <FaMapMarkerAlt className="mr-2 text-orange-500" />
                      <span>{item.location}</span>
                    </div>
                  )}

                  <p className="text-gray-700 text-sm md:text-lg leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {item.extras && (
                    <div className="space-y-3">
                      {item.extras.map((extra, i) => (
                        <div
                          key={i}
                          className="flex items-start bg-orange-50 p-3 rounded-lg border border-orange-100"
                        >
                          <FaMapMarkerAlt className="mt-1 mr-2 text-orange-500" />
                          <div>
                            <p className="font-semibold text-gray-800 text-base md:text-lg">
                              {extra}
                            </p>
                            <p className="text-gray-600 mt-1 text-sm">
                              Afterwards, you will get a small briefing from the
                              trip leader(s).
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button
          onClick={() => (window.location.href = "/register")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default ItinerarySection;
