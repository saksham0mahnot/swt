import React, { useState, useEffect } from "react";
// import "./flip.css"; // Ensure this includes the `flip` animation CSS

const TimeBox = ({ value, label }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 600); // match animation time
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl lg:rounded-4xl shadow-[5px_5px_10px_rgba(0,0,0,0.4)] w-20 sm:w-30 lg:w-40 h-20 sm:h-40 lg:h-55 mx-2 bg-orange-500`}
    >
      <style>{`
        @keyframes flip {
          0% {
            transform: rotateX(0deg);
          }
          100% {
            transform: rotateX(-360deg);
          }
        }

        .flip {
          animation: flip 0.6s ease-in-out;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>
      <div
        className={`text-3xl sm:text-5xl lg:text-7xl font-bold ${
          animate ? "flip" : ""
        } text-white`}
      >
        {value}
      </div>
      <div className="text-[10px] sm:text-lg lg:text-xl mt-2 sm:mt-4 text-white">
        {label}
      </div>
    </div>
  );
};

export default TimeBox;
