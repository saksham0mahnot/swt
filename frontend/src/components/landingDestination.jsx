import React from "react";
import { Star } from "lucide-react";

const LandingDestination = () => {
  const HeroSection = () => (
    <div
      className="relative w-full h-[327px] bg-cover bg-center"
      style={{
        // backgroundImage: `url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundImage: `url('https://images.unsplash.com/photo-1506059612708-99d6c258160e?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="absolute inset-0 bg-black/30 bg-opacity-40"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-6">
          <h1 className="text-2xl sm:text-4xl font-bold">
            Sneak peak to hotel deals
          </h1>
        </div>
      </div>
    </div>
  );

  const PackagesGrid = () => {
    const packages = [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
        title: "Dharamshala - McLeodganj - Bir Billing",
        description:
          "Experience the thrill of paragliding and explore the scenic beauty of Himachal over a 2 night 3 day adventure.",
        price: "₹7,500",
        rating: 4.8,
        reviews: 154,
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1612638039814-1a67ea727114?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Kasol Escape",
        description:
          "Explore the tranquil beauty of Kasol on a 2 nights 3 days trip starting at just ₹4750 per person (for a group of 4 or more). The package includes round-trip transport from Delhi, comfortable hotel stays, daily breakfast, and scooty rental for 2 days. Dinner is available at an extra cost of ₹250.",
        price: "₹4,750",
        rating: 4.9,
        reviews: 189,
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Goa Getaway",
        description:
          "Enjoy a budget-friendly 3-day escape to Goa starting at ₹6500 per person (minimum group of 4). The package includes round-trip transport from Bangalore, 3-star hotel accommodation, daily breakfast, and the option to add dinner for ₹250. Upgrade to a hotel near Calangute beach is also available for an extra ₹250.",
        price: "₹6,500",
        rating: 4.7,
        reviews: 204,
      },
    ];

    const StarRating = ({ rating }) => {
      // Define gradient colors based on rating
      let starColor = "#facc15"; // yellow-400
      let starGlow = "";

      if (rating >= 4.8) {
        starColor = "#f59e0b"; // amber-400
        starGlow = "drop-shadow(0 0 2px rgba(245, 158, 11, 0.5))"; // Amber glow
      } else if (rating >= 4.5) {
        starColor = "#f59e0b"; // amber-500
        starGlow = "drop-shadow(0 0 1px rgba(245, 158, 11, 0.3))"; // Subtle amber glow
      } else if (rating >= 4.0) {
        starColor = "#f97316"; // orange-500
      } else if (rating >= 3.0) {
        starColor = "#eab308"; // yellow-500
      }

      // Create an array of 5 stars
      const stars = [];

      for (let i = 0; i < 5; i++) {
        // Calculate how filled this star should be (0 to 1)
        const fillPercentage = Math.max(0, Math.min(1, rating - i));

        stars.push(
          <div
            key={i}
            className="relative w-4 h-4 transition-all duration-300 hover:scale-110"
          >
            {/* Background star (gray outline) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-gray-300 absolute top-0 left-0"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>

            {/* Filled star with clip path for partial fill */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={starColor}
              stroke={starColor}
              strokeWidth="0"
              className="w-4 h-4 absolute top-0 left-0"
              style={{
                clipPath: `inset(0 ${100 - fillPercentage * 100}% 0 0)`,
                filter: fillPercentage > 0 && starGlow ? starGlow : "none",
              }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        );
      }

      return <div className="flex items-center space-x-1">{stars}</div>;
    };

    return (
      <div
        className="bg-gray-50 py-26"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-16">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                style={{ width: "358px", height: "510px" }}
              >
                <div className="relative">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full object-cover"
                    style={{ height: "257px" }}
                  />
                </div>

                <div
                  className="p-5 flex flex-col justify-between"
                  style={{ height: "263px" }}
                >
                  <div>
                    <h3
                      className="font-bold text-gray-800 mb-2"
                      style={{
                        fontSize: "28px",
                        lineHeight: "1.2",
                      }}
                    >
                      {pkg.title}
                    </h3>
                    <p
                      className="text-gray-600 mb-3 leading-tight"
                      style={{
                        fontSize: "12px",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {pkg.description}
                    </p>

                    <div className="mb-3">
                      <div
                        className="font-bold text-gray-800"
                        style={{
                          fontSize: "13px",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Starting at {pkg.price} per person
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center mb-5">
                      <StarRating rating={pkg.rating} />
                      <span className="text-xs text-gray-500 ml-2">
                        ({pkg.reviews} reviews)
                      </span>
                      <span
                        className="text-xs font-medium ml-2 px-2 py-0.5 rounded-md shadow-sm transition-all duration-300 hover:scale-105"
                        style={{
                          background:
                            pkg.rating >= 4.8
                              ? "linear-gradient(135deg, #f59e0b, #d97706)"
                              : pkg.rating >= 4.5
                              ? "linear-gradient(135deg, #f59e0b, #ea580c)"
                              : pkg.rating >= 4.0
                              ? "linear-gradient(135deg, #f97316, #ea580c)"
                              : pkg.rating >= 3.0
                              ? "linear-gradient(135deg, #eab308, #ca8a04)"
                              : "linear-gradient(135deg, #9ca3af, #6b7280)",
                          color: "white",
                          fontWeight: "bold",
                          border:
                            pkg.rating >= 4.8
                              ? "1px solid rgba(245, 158, 11, 0.5)"
                              : "none",
                        }}
                      >
                        {pkg.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* <div className="flex flex-col space-y-5 mb-5">
                      <button
                        className="text-white py-5 flex justify-center items-center rounded-lg hover:opacity-90 transition-all font-semibold text-sm "
                        style={{
                          width: '141px',
                          height: '27px',
                          fontFamily: 'Poppins, sans-serif',
                          background:
                            'linear-gradient(135deg, #FF4D00 0%, #990000 100%)', }} >
                        Book Now
                      </button>
                      <button className="text-gray-700 hover:text-gray-800 text-xs font-medium text-left" style={{fontFamily: 'Poppins, sans-serif'}}>
                        View more Details →
                      </button>
                    </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <HeroSection />
      <PackagesGrid />
    </div>
  );
};

export default LandingDestination;
