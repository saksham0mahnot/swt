import React, { useState, useEffect } from "react";
import TimeBox from "../features/timerBox.jsx";
import Illustration from "../assets/ILL.jpg";
import disount from "../assets/discount.webp";
import assured from "../assets/quality.webp";
import payment from "../assets/money.webp";

const CountdownTimer = () => {
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
  <div className="relative overflow-hidden shadow-xl w-full">
  <img
    src={Illustration}
    alt="Mountain Adventure"
    className="w-full h-[300px] sm:h-[400px] lg:h-[670px]"
  />

  {/* Title Outside Main Centered Box */}
  <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 text-center w-full px-4">
    <h2 className="text-[#ff6900] text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-wide drop-shadow-md" style={{fontFamily:'Playfair Display'}}>
      Hotel Booking Starts In
    </h2>
  </div>

  {/* Countdown - perfectly centered */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 w-full h-[370px] sm:h-[470px] lg:h-[550px]">
    <div className="flex justify-center items-center h-full">
      <TimeBox value={countdown.days} label="Days" />
      <span className="text-orange-500 text-2xl sm:text-5xl lg:text-8xl font-semibold lg:mx-4">:</span>
      <TimeBox value={countdown.hours} label="Hours" />
      <span className="text-orange-500 text-2xl sm:text-5xl lg:text-8xl font-semibold lg:mx-4">:</span>
      <TimeBox value={countdown.minutes} label="Minutes" />
      <span className="text-orange-500 text-2xl sm:text-5xl lg:text-8xl font-semibold lg:mx-4">:</span>
      <TimeBox value={countdown.seconds} label="Seconds" />
    </div>
  </div>
</div>
  );
};

export default CountdownTimer;
