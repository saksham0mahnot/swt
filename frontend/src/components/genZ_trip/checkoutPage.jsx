import React, { useState } from "react";
import { Image, Button, Card, Badge, DatePicker, Carousel } from "antd";
import {
  Calendar,
  Wind,
  ArrowLeft,
  Plane,
  Wifi,
  Briefcase,
  Filter,
  MapPin,
  BaggageClaim,
  Bus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import MapSection from "./map";
import img_1 from "../../assets/genZ_trip/1.jpg"
import img_2 from "../../assets/genZ_trip/2.jpg"
import img_3 from "../../assets/genZ_trip/3.jpg"
import img_4 from "../../assets/genZ_trip/4.jpg"

const { RangePicker } = DatePicker;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  // State for price and coupon management
  const initialPrice = 5500;
  const [totalPrice, setTotalPrice] = useState(initialPrice);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState({ code: "", discount: 0 });
  const [promoMessage, setPromoMessage] = useState({ text: "", type: "" });
  const [isValidating, setIsValidating] = useState(false);

  // Handler for submitting the promo code
  const handlePromoSubmit = async () => {
    // Reset any existing messages
    setPromoMessage({ text: "", type: "" });

    // Validate empty input
    if (!promoCode || promoCode.trim() === "") {
      setPromoMessage({
        text: "Please enter a valid promo code",
        type: "error",
      });
      return;
    }

    // Check if a coupon is already applied
    if (isCouponApplied) {
      setPromoMessage({
        text: "A coupon is already applied. Remove it to use a different code",
        type: "error",
      });
      setPromoCode("");
      return;
    }

    try {
      // Show loading state
      setIsValidating(true);
      setPromoMessage({ text: "Validating coupon...", type: "info" });

      const response = await api.post("/api/web/validateCoupon", {
        couponCode: promoCode.trim(),
      });

      const data = response.data;

      if (data.isValid) {
        // Calculate new total
        const newTotal = initialPrice - data.discount;
        setTotalPrice(newTotal);
        setIsCouponApplied(true);
        setAppliedCoupon({
          code: promoCode.trim().toUpperCase(),
          discount: data.discount,
        });

        // Show success message with savings
        const savingsPercent = Math.round((data.discount / initialPrice) * 100);
        setPromoMessage({
          text: `🎉 CONGRATULATIONS! You saved ₹${data.discount.toLocaleString()} (${savingsPercent}% off) with this coupon!`,
          type: "success",
        });
        setPromoCode("");

        // Add celebration animation targeted to the entire promo section
        const promoSection = document.getElementById("promo-section");
        if (promoSection) {
          // Create confetti container
          const confetti = document.createElement("div");
          confetti.className = "confetti-container";
          confetti.style.position = "absolute";
          // Position the confetti to cover the entire promo section
          confetti.style.inset = "0"; // Use inset instead of top/left/right/bottom for full coverage
          confetti.style.width = "100%";
          confetti.style.height = "100%";
          // Ensure the confetti container has sufficient height for animation
          confetti.style.minHeight = "350px";
          confetti.style.pointerEvents = "none";
          confetti.style.zIndex = "50";

          // Create confetti pieces with different shapes and sizes
          const colors = [
            "#FF6B6B",
            "#4ECDC4",
            "#45B7D1",
            "#96CEB4",
            "#FFEEAD",
            "#FF8C42",
            "#A2D2FF",
          ];
          const shapes = [
            // Square
            (color) => `<div class="absolute animate-confetti" style="
               left: ${Math.random() * 100}%;
               top: ${
                 Math.random() * 100
               }%; /* Distribute throughout the entire section */
              width: ${5 + Math.random() * 5}px;
              height: ${5 + Math.random() * 5}px;
              background: ${color};
              transform: rotate(${Math.random() * 360}deg);
            "></div>`,
            // Circle
            (color) => `<div class="absolute animate-confetti" style="
               left: ${Math.random() * 100}%;
               top: ${
                 Math.random() * 100
               }%; /* Distribute throughout the entire section */
              width: ${5 + Math.random() * 5}px;
              height: ${5 + Math.random() * 5}px;
              background: ${color};
              border-radius: 50%;
              transform: rotate(${Math.random() * 360}deg);
            "></div>`,
            // Triangle
            (color) => `<div class="absolute animate-confetti" style="
                left: ${Math.random() * 100}%;
                top: ${
                  Math.random() * 100
                }%; /* Distribute throughout the entire section */
                width: 0;
                height: 0;
                border-left: ${4 + Math.random() * 4}px solid transparent;
                border-right: ${4 + Math.random() * 4}px solid transparent;
                border-bottom: ${8 + Math.random() * 8}px solid ${color};
                transform: rotate(${Math.random() * 360}deg);
              "></div>`,
            // Rectangle (for variety)
            (color) => `<div class="absolute animate-confetti" style="
                left: ${Math.random() * 100}%;
                top: ${
                  Math.random() * 100
                }%; /* Distribute throughout the entire section */
                width: ${3 + Math.random() * 3}px;
                height: ${8 + Math.random() * 8}px;
                background: ${color};
                transform: rotate(${Math.random() * 360}deg);
              "></div>`,
          ];

          // Generate confetti pieces - using more pieces to ensure coverage from "Offers for you" to success message
          confetti.innerHTML = Array(100)
            .fill()
            .map(() => {
              const color = colors[Math.floor(Math.random() * colors.length)];
              const shape = shapes[Math.floor(Math.random() * shapes.length)];
              return shape(color);
            })
            .join("");

          // Make sure the promo section has relative positioning for absolute positioning of confetti
          promoSection.style.position = "relative";
          // Ensure the confetti animation covers the entire section from heading to success message
          promoSection.style.overflow = "hidden";
          promoSection.appendChild(confetti);

          // Remove confetti after animation completes (matching the 3.5s animation duration)
          setTimeout(() => promoSection.removeChild(confetti), 3500);
        }
      } else {
        setPromoMessage({
          text:
            data.message ||
            "Invalid or expired coupon code. Please check and try again.",
          type: "error",
        });
        setPromoCode("");
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      setPromoMessage({
        text: "Invalid or inactive coupon",
        type: "error",
      });
      setPromoCode("");
    } finally {
      setIsValidating(false);
    }

    // Clear message after 4 seconds
    setTimeout(() => {
      setPromoMessage({ text: "", type: "" });
    }, 4000);
  };

  const handlePromoCodeChange = (e) => {
    const newCode = e.target.value.toUpperCase();
    setPromoCode(newCode);

    // If a coupon was applied, but the user starts typing in the input again,
    // reset the coupon discount and message.
    if (isCouponApplied) {
      setIsCouponApplied(false);
      setTotalPrice(initialPrice);
      setAppliedCoupon({ code: "", discount: 0 });
      setPromoMessage({ text: "", type: "" });
    }
  };

  const handleProceedToRegistration = () => {
    navigate("/traveler_form", {
      state: {
        finalAmount: totalPrice,
        discount: appliedCoupon.discount,
        coupon: appliedCoupon.code,
        initialPrice: initialPrice,
      },
    });
  };

  // Button click handlers
  const handleGoBack = () => {
    window.history.back();
  };

  const handleStarClick = (starIndex) => {
    setUserRating(starIndex);
    console.log(`User rated: ${starIndex} stars`);
  };

  const handleStarHover = (starIndex) => {
    setHoveredStar(starIndex);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  return (
    <>
      {/* Google Fonts Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen"
        style={{
          backgroundColor: "#FFDBCC",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Header */}
        <div className="p-4 ">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 mb-4 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-lg font-medium">Go Back</span>
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-8 flex flex-col lg:flex-row gap-6">
          {/* Hotel Preview */}
          <div className="relative flex-1 lg:max-w-[865px]">
            {/* Top Orange Header */}
            <div
              className="rounded-t-2xl px-4 lg:px-6 py-3 lg:py-4 flex justify-center"
              style={{ backgroundColor: "#FF6E2F" }}
            >
              <h2 className="text-white text-2xl font-medium">
                About the Trip
              </h2>
            </div>

            {/* White Content Box */}
            <div className="bg-white rounded-b-2xl p-4 lg:p-6 shadow-sm">
              {/* Images - Carousel on mobile, Grid on desktop */}
              <div className="mb-6">
                {/* Mobile Carousel */}
                <div className="block  md:hidden">
                  <Carousel
                    arrows
                    dots={true}
                    autoplay={false}
                    className="rounded-2xl overflow-hidden"
                  >
                    <div>
                      <Image
                        src={img_1}
                        alt="Resort main view"
                        width="100%"
                        height={300}
                        className="w-full h-[300px] object-cover"
                      />
                    </div>
                    {Array.from({ length: 1 }).map((_, index) => (
                      <div key={index}>
                        <Image
                          src={img_2}
                          alt={`Resort view ${index + 1}`}
                          width="100%"
                          height={300}
                          className="w-full h-[300px] object-cover"
                        />
                      </div>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <div key={index}>
                        <Image
                          src={img_3}
                          alt={`Resort view ${index + 1}`}
                          width="100%"
                          height={300}
                          className="w-full h-[300px] object-cover"
                        />
                      </div>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <div key={index}>
                        <Image
                          src={img_4}
                          alt={`Resort view ${index + 1}`}
                          width="100%"
                          height={300}
                          className="w-full h-[300px] object-cover"
                        />
                      </div>
                    ))}
                    <div>
                      <Image
                        src="https://images.unsplash.com/photo-1642693373219-0540fe607261?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Resort view 4"
                        width="100%"
                        height={300}
                        className="w-full h-[300px] object-cover"
                      />
                    </div>
                  </Carousel>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-4 gap-2">
                  <div className="col-span-2">
                    <Image
                      src={img_1}
                      alt="Resort main view"
                      width="100%"
                      height={400}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                  </div>
                  <div className="col-span-2 grid grid-cols-2 gap-2">
                    {Array.from({ length: 1 }).map((_, index) => (
                      <Image
                        key={index}
                        src={img_2}
                        alt={`Resort view ${index + 1}`}
                        width="100%"
                        height={195}
                        className="w-full h-[195px] object-cover rounded-lg"
                      />
                    ))}
                    <div className="relative">
                      <Image
                        src={img_3}
                        alt="Resort view 4"
                        width="100%"
                        height={195}
                        className="w-full h-[195px] object-cover rounded-lg"
                      />
                    </div>
                    <div className="relative">
                      <Image
                        src={img_4}
                        alt="Resort view 4"
                        width="100%"
                        height={195}
                        className="w-full h-[195px] object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <Image
                        src="https://images.unsplash.com/photo-1642693373219-0540fe607261?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Resort view 4"
                        width="100%"
                        height={195}
                        className="w-full h-[195px] object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hotel Info */}
              <div className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-3">
                  <h1 className="text-xl md:text-2xl font-semibold">
                    Gen-z Trip to Manali
                  </h1>
                </div>
                <div className="flex items-center mb-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-medium mr-3">
                    8.0
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    Very Good
                  </span>
                  <div className="flex ml-3" onMouseLeave={handleStarLeave}>
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = star <= (hoveredStar || userRating);
                      return (
                        <svg
                          key={star}
                          className={`w-4 h-4 cursor-pointer transition-colors duration-150 ${
                            isFilled ? "text-yellow-400" : "text-gray-300"
                          } hover:text-yellow-400`}
                          fill={isFilled ? "currentColor" : "none"}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          onClick={() => handleStarClick(star)}
                          onMouseEnter={() => handleStarHover(star)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
                          />
                        </svg>
                      );
                    })}
                  </div>
                  {userRating > 0 && (
                    <span className="ml-2 text-sm text-gray-600">
                      ({userRating}/5)
                    </span>
                  )}
                </div>
                <div className="text-blue-600 text-sm mb-4 hover:text-blue-800 cursor-pointer">
                  View all 365 Ratings and Reviews →
                </div>
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="w-4 h-4 mr-2 text-red-500" />
                  <span className="font-medium">Manali, Manaslu River</span>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-start">
                    <span className="text-lg mr-2">▶</span>
                    <span>
                      Free cancellation available till{" "}
                      <strong>4th August, 2025</strong>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-lg mr-2">▶</span>
                    <span>
                      Around 30 rooms across categories: Premium, Luxury, and
                      Family Suite, some featuring balconies/terraces
                      overlooking the river and mountains.
                    </span>
                  </div>
                </div>

                {/* Feature Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Pure vegetarian menu", icon: "🌱" },
                    {
                      label:
                        "Boutique experience with personalized hospitality",
                      icon: "✨",
                    },
                    { label: "Ideal base for sightseeing", icon: "👥" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center gap-2 border-2 border-orange-500 rounded-lg px-4 py-2 hover:shadow-md transition-all cursor-pointer min-h-[56px]"
                    >
                      <span>{item.icon}</span>
                      <span className="text-center font-medium leading-tight text-sm">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Map */}
                <MapSection />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 flex-shrink-0 lg:w-full lg:max-w-sm">
            {/* Promo Code */}
            <div
              className="bg-white rounded-2xl p-6 shadow-sm promo-container"
              id="promo-section"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Offers for you</h3>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Have a promocode ? Redeem here"
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  onClick={handlePromoSubmit}
                  disabled={isValidating}
                  className={`w-full py-2 rounded-lg transition-all duration-300 flex items-center justify-center ${
                    isValidating
                      ? "bg-orange-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  <span className="text-white font-medium">
                    {isValidating ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Validating...
                      </>
                    ) : (
                      "Apply Code"
                    )}
                  </span>
                </button>
              </div>
              {promoMessage.text && (
                <div
                  className={`mt-3 rounded-lg p-3 text-center text-sm font-medium transition-all duration-300 ${
                    {
                      success:
                        "bg-green-50 border border-green-200 text-green-800 shadow-sm",
                      error:
                        "bg-red-50 border border-red-200 text-red-800 shadow-sm",
                      info: "bg-blue-50 border border-blue-200 text-blue-800 animate-pulse",
                    }[promoMessage.type]
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {promoMessage.type === "success" && (
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    {promoMessage.type === "error" && (
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    {promoMessage.type === "info" && (
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    <span>{promoMessage.text}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Flight Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-1">
                New Delhi → Manali (13 - 17 Aug)
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                5 Days 4 Nights • Group Trip • Premium Package
              </p>
              <div className="text-sm text-gray-600 mb-2">
                River Side Hotel{" "}
                <span className="text-green-600 ml-2">⭐ 4.5 Rating</span>
              </div>
              <div className="flex justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-500">13th Aug, 2025</div>
                  <div className="text-2xl font-bold">Departure</div>
                  <div className="text-sm">DELHI</div>
                  <div className="text-xs text-gray-500">
                    Kashmiri Gate Bus Terminal
                  </div>
                  <div className="text-xs text-gray-500">Evening Departure</div>
                </div>
                <Bus className="w-10 h-10 text-gray-500 mt-6" />
                <div className="text-right ">
                  <div className="text-sm text-gray-500">14th Aug, 2025</div>
                  <div className="text-2xl font-bold">Arrival</div>
                  <div className="text-sm">MANALI</div>
                  <div className="text-xs text-gray-500">Manali Bus Stand</div>
                  <div className="text-xs text-gray-500">Morning Arrival</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="flex items-center gap-2 text-sm font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-1-8h1m-1 4h1"
                    />
                  </svg>
                  Accommodation Details
                </h4>
                <p className="text-sm text-gray-600">
                  13th to 17th August Manali Trip
                </p>
                <p className="text-sm text-gray-600">
                  River Side Hotel
                </p>
                <p className="text-sm text-gray-600">
                  4 nights
                </p>
              </div>
              {/* Trip highlights */}
              <div className="flex justify-between text-sm text-gray-600">
                <div>
                  <p>🏔️ Mountain Views</p>
                  <p>🚌 AC Volvo Transport</p>
                  <p>🍽️ Meals Included</p>
                  <p className="text-xs text-gray-500">(Breakfast & Dinner)</p>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Sightseeing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Group Activities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>All Inclusive</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Package Price:</span>
                    <span>₹{initialPrice.toLocaleString()}</span>
                  </div>
                  {isCouponApplied && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span className="font-medium">
                        Coupon ({appliedCoupon.code}):
                      </span>
                      <span className="font-medium">
                        - ₹{appliedCoupon.discount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-dashed">
                    <span className="text-lg font-bold text-gray-800">
                      Total Price:
                    </span>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-orange-600 text-2xl">
                        ₹{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end  w-full">
                    <Button
                      className="!text-lg !bg-gradient-to-r !from-orange-600 !to-red-600 !border-none !shadow-lg hover:!shadow-xl !rounded-xl !px-7 sm:!px-5 !py-2.5 sm:!py-3 w-full !h-auto !font-bold !text-white hover:!scale-105 !transition-all !duration-300 cursor-pointer"
                      onClick={handleProceedToRegistration}
                    >
                      Pay Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
