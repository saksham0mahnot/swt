import React, { useEffect } from "react";
import { Typography } from "antd";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const { Title, Paragraph } = Typography;

export default function ContactUs() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-yellow-50 px-6 py-20 text-black font-sans">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#ff512f] to-[#dd2476] text-transparent bg-clip-text drop-shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Let’s Connect ✨
          </motion.h1>
          <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
            Slide into our inbox 📥 or drop a pin 📍—we’d love to hear from you!
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            className="backdrop-blur-md bg-white/60 border border-gray-300 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Title
              level={3}
              className="!text-[#FF4000] mb-6 font-bold tracking-tight"
            >
              🔗 Contact Info
            </Title>
            <div className="space-y-6 text-base text-gray-800">
              <div>
                <p className="font-semibold text-gray-700">📧 Email</p>
                <a
                  href="mailto:skipwithtrips@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  skipwithtrips@gmail.com
                </a>
              </div>
              <div>
                <p className="font-semibold text-gray-700 flex items-center gap-2">
                  📞 Phone /
                  <FaWhatsapp className="text-green-500 text-xl" />
                  WhatsApp
                </p>
                <a
                  href="tel:+918527958951"
                  className="text-blue-600 hover:underline"
                >
                  +91-8527958951
                </a>
              </div>
              <div>
                <p className="font-semibold text-gray-700">📍 Address</p>
                <p>Christ University Delhi NCR, Ghaziabad, UP 201003</p>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-300"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11773.236143707674!2d77.40934213761437!3d28.683542215177994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf059aeaf695d%3A0xdc407fcde59a0d0f!2sCHRIST%20(Deemed%20to%20be%20University)%20Delhi%20NCR!5e0!3m2!1sen!2sin!4v1750847665002!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Christ University Map"
              className="w-full h-full"
            ></iframe>
          </motion.div>
        </div>

        {/* Footer Note */}
        <Paragraph className="text-center text-gray-500 mt-12 italic">
          💬 We usually reply within 24–48 hours. Stay awesome!
        </Paragraph>
      </motion.div>
    </div>
  );
}
