import { useLocation } from "react-router-dom";
import { CheckCircle, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function BookingConfirmed() {
  const location = useLocation();
  const bookingId = location.state?.bookingId || "N/A";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-10 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500" size={48} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
          Booking Confirmed!
        </h1>

        <p className="text-gray-800 mb-4 text-sm sm:text-base">
          Thank you! Your booking has been successfully confirmed.
        </p>

        <div className="bg-white rounded-xl border border-gray-300 p-4 flex items-center justify-between mb-3">
          <div className="text-sm sm:text-base text-gray-900 font-medium">
            Booking ID:{" "}
            <span className="text-orange-600 font-bold">{bookingId}</span>
          </div>
          <button
            onClick={handleCopy}
            className="text-gray-600 hover:text-orange-500 transition"
            aria-label="Copy Booking ID"
          >
            <Copy size={18} />
          </button>
        </div>

        {copied && (
          <p className="text-green-600 text-xs sm:text-sm mb-2">
            Booking ID copied to clipboard!
          </p>
        )}

        <button
          onClick={() => window.location.href = '/'}
          className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300 transition text-sm"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}
