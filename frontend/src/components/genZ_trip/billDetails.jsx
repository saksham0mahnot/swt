import React, { useEffect } from "react";
import { X } from "lucide-react";
import checkout from "../../assets/genZ_trip/checkout1.jpg";

const BillDetailsPopup = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-3xl h-auto flex flex-col shadow-2xl">
        {/* Header with close button - Fixed height */}
        <div className="relative p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900 pr-10">
            Booking Details
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col md:flex-row p-6 gap-6">
            {/* Left side - Hotel image and details */}
            <div className="flex-1">
              <div className="mb-4">
                <img
                  src={checkout}
                  alt="Hotel room"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  The Himalayan Stories - A Riverside Heaven Resort
                </h3>
                <p className="text-sm text-gray-600 mb-1">1 x Premium Room</p>
                <p className="text-sm text-gray-600 mb-2">2 x Beds</p>
                <button className="text-sm text-blue-600 hover:underline mb-4">
                  View Details →
                </button>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Check In</p>
                      <p className="font-medium">14th Aug, 2025</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Check Out</p>
                      <p className="font-medium">16th Aug, 2025</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Guests</p>
                      <p className="font-medium">5</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Bill details */}
            <div className="w-full md:w-80 flex-shrink-0">
              <div className="bg-orange-500 text-white p-4 rounded-t-xl">
                <h2 className="text-lg font-semibold mb-4">Bill Details</h2>

                <div className="space-y-3">
                  <h3 className="font-medium text-orange-100">Price Breakup</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-orange-100">Booking Price</span>
                      <span className="font-medium">₹7,800</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-100">GST (18%)</span>
                      <span className="font-medium">₹1,404</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-100">Platform Fee</span>
                      <span className="font-medium">₹199</span>
                    </div>
                    <div className="flex justify-between text-green-100">
                      <span>Discount Applied</span>
                      <span className="font-medium">-₹1,603</span>
                    </div>
                  </div>

                  <div className="border-t border-orange-400 pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Payable</span>
                      <span>₹7,800</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings highlight */}
              <div className="bg-orange-400 text-white p-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🎉</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-orange-100">
                    Your total savings on this booking!
                  </p>
                  <p className="font-semibold text-lg">₹4,600</p>
                </div>
              </div>

              {/* Payment section */}
              <div className="bg-gray-50 p-4 rounded-b-xl">
                <button
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
                  onClick={() => {
                    alert("Redirecting to payment gateway...");
                    onClose();
                  }}
                >
                  Pay ₹7,800
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Secure payment gateway
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetailsPopup;
