import { Button, Carousel } from "antd";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import bali from "../assets/bali.jpg";
// import paris from "../assets/paris.jpg";
// import japan from "../assets/japan.jpg";
// import santo from "../assets/santo.jpg";

// Sample data for carousel and popular places
const carouselItems = [
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
    title: "Mountain Adventure",
    description:
      "Discover breathtaking peaks and pristine wilderness on our guided mountain expeditions.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
    title: "Ocean Paradise",
    description:
      "Dive into crystal-clear waters and explore vibrant coral reefs in tropical destinations.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop",
    title: "Forest Retreat",
    description:
      "Reconnect with nature in serene forest sanctuaries and peaceful hiking trails.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=600&fit=crop",
    title: "City Escape",
    description:
      "Experience the thrill of urban exploration in bustling metropolises around the world.",
  },
];

export default function CarouselContainer({ onBookNowClick }) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-12-15T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-4 py-4">
      <div className="rounded-2xl overflow-hidden shadow-xl ">
        <Carousel
          arrows
          autoplay
          effect="fade"
          className="w-full"
          autoplaySpeed={5000}
          pauseOnHover={false}
          dots={{ className: "custom-dots" }}
        >
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />

              {/* Countdown Timer in the center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 h-[370px] sm:h-[470px] lg:h-[550px] w-full">
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-7 text-white shadow-2xl border border-white/10 overflow-hidden max-w-sm sm:max-w-md lg:max-w-lg mx-auto h-[170px] sm:h-[240px] lg:h-[280px] ">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-pulse"></div>

                  {/* Floating particles effect */}
                  <div className="absolute top-2 left-4 w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
                  <div className="absolute top-8 right-6 w-1 h-1 bg-blue-400/60 rounded-full animate-ping"></div>
                  <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-purple-400/50 rounded-full animate-pulse"></div>

                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Summer Adventure Countdown
                    </h3>

                    {/* Mobile: 2x2 grid layout, Desktop: horizontal layout */}
                    <div className="grid grid-cols-4 sm:grid-cols-4  gap-2 sm:gap-4 lg:flex lg:gap-6 lg:justify-center">
                      <div className="group">
                        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-1 sm:p-3 lg:p-4 border border-white/20 transition-all duration-300 hover:scale-105 hover:border-purple-400/50">
                          <div className="text-2xl sm:text-3xl lg:text-5xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-1 sm:mb-2">
                            {countdown.days}
                          </div>
                          <div className="text-xs  tracking-widest text-purple-200 font-normal">
                            Days
                          </div>
                        </div>
                      </div>

                      <div className="group">
                        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-1 sm:p-3 lg:p-4 border border-white/20 transition-all duration-300 hover:scale-105 hover:border-blue-400/50">
                          <div className="text-2xl sm:text-3xl lg:text-5xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-1 sm:mb-2">
                            {countdown.hours}
                          </div>
                          <div className="text-xs  tracking-widest text-blue-200 font-normal">
                            Hours
                          </div>
                        </div>
                      </div>

                      <div className="group">
                        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-1 sm:p-3 lg:p-4 border border-white/20 transition-all duration-300 hover:scale-105 hover:border-green-400/50">
                          <div className="text-2xl sm:text-3xl lg:text-5xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-1 sm:mb-2">
                            {countdown.minutes}
                          </div>
                          <div className="text-xs  tracking-widest text-green-200 font-normal">
                            Minutes
                          </div>
                        </div>
                      </div>

                      <div className="group">
                        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-1 sm:p-3 lg:p-4 border border-white/20 transition-all duration-300 hover:scale-105 hover:border-orange-400/50">
                          <div className="text-2xl sm:text-3xl lg:text-5xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-1 sm:mb-2">
                            {countdown.seconds}
                          </div>
                          <div className="text-xs  tracking-widest text-orange-200 font-normal">
                            Seconds
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
                      <p className="text-sm sm:text-lg lg:text-xl font-medium bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                        Until July 1, 2025
                      </p>
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Original content moved to bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                <div className="container mx-auto">
                  <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-2 sm:mb-3 animate-fadeIn">
                    {item.title}
                  </h2>
                  <p className="text-base sm:text-lg lg:text-2xl mb-4 sm:mb-6 animate-fadeIn animation-delay-300 max-w-full sm:max-w-2xl">
                    {item.description}
                  </p>

                  <Button
                    type="primary"
                    size="large"
                    className="!bg-gradient-to-r !from-orange-600 !to-red-600 !to-orange-600 !border-none !shadow-lg hover:!shadow-xl !rounded-xl !px-6 sm:!px-8 !py-2 !h-10 sm:!h-12 !text-sm sm:!text-base !font-semibold !text-white hover:!scale-105 !transition-all !duration-300 relative overflow-hidden group"
                    onClick={onBookNowClick}
                  >
                    <span className="relative z-10">Book Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
