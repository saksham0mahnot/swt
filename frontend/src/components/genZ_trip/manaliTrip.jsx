import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ManaliTrip = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [activeTab, setActiveTab] = useState("About");

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Discover the Magic of",
      subtitle: "Manali",
      description: "Expedition",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Mountain Adventure",
      subtitle: "Awaits",
      description: "You",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581791534721-e599df4417f7?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Scenic Beauty",
      subtitle: "Beyond",
      description: "Imagination",
    },
    {
      image:
        "https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Escape Into",
      subtitle: "Nature",
      description: "Unplugged",
    },
    {
      image:
        "https://images.unsplash.com/photo-1693777392692-5fd14234de20?q=80&w=1614&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Sunsets & Shores",
      subtitle: "Calling",
      description: "Wanderlust",
    },
    {
      image:
        "https://images.unsplash.com/photo-1658067934819-3609a25136f8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Into the Heart of",
      subtitle: "The Mountains",
      description: "Breathe",
    },
    {
      image:
        "https://images.unsplash.com/photo-1695706295730-5eacce99e532?q=80&w=1079&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Journeys Through",
      subtitle: "Hidden Paths",
      description: "Serenity",
    },
  ];

  // const [activeTab, setActiveTab] = useState(null);
  // const tabs = [
  //   "About",
  //   "Itinerary",
  //   "Inclusive",
  //   "Exclusive",
  //   "Privacy Policy",
  // ];
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[500px] bg-white">
      {/* Hero Section with Carousel - Full Scale */}
      <div className="relative h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
              }}
            >
              <div className="flex items-center justify-center h-full px-4">
                <div className="text-center text-white">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light mb-2">
                    {slide.title}
                  </h1>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-2">
                    {slide.subtitle}
                  </h2>
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl italic font-light font-[Caveat] mt-1">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 bg-opacity-20 hover:bg-opacity-30 text-white p-2 sm:p-3 rounded-full transition-all"
        >
          <FaAngleLeft></FaAngleLeft>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 bg-opacity-20 hover:bg-opacity-30 text-white p-2 sm:p-3 rounded-full transition-all"
        >
          <FaAngleRight></FaAngleRight>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

{
  /* Sidebar */
}
{
  /* <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500" />
              </div>
              </div>
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <div className="text-center">
              <p className="text-gray-600 text-xs sm:text-sm">Starting from</p>
              <p className="text-xl sm:text-2xl font-bold text-orange-500">₹12,999</p>
              <p className="text-gray-500 text-xs sm:text-sm">per person</p>
              </div>
              <div className="border-t pt-3 sm:pt-4">
              <p className="text-gray-600 text-xs sm:text-sm mb-2">Trip Duration</p>
              <p className="font-semibold text-sm sm:text-base"> 4 Nights / 5 Days</p>
              </div>
              <div className="border-t pt-3 sm:pt-4">
              <p className="text-gray-600 text-xs sm:text-sm mb-2">Best Time to Visit</p>
              <p className="font-semibold text-sm sm:text-base"> March to June</p>
              </div>
              </div>
              </div> */
}
export default ManaliTrip;
