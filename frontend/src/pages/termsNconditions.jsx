import React, { useEffect } from "react";
import { Typography } from 'antd';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

const termsSections = [
  {
    title: "Definitions",
    content: (
      <>
        <strong>"Platform"</strong>: SWT website and services. <br />
        <strong>"Service Provider"</strong>: Hotels, airlines, etc. <br />
        <strong>"Booking"</strong>: Confirmed travel service. <br />
        <strong>"User"</strong>: You.
      </>
    ),
  },
  {
    title: "Scope of Our Service",
    content: "SWT connects users with third-party service providers. We do not own or operate any services listed.",
  },
  {
    title: "User Responsibilities",
    content:
      "You must be at least 18 and legally competent. You agree to provide accurate information and avoid fraudulent bookings.",
  },
  {
    title: "Pricing",
    content:
      "All prices are in Indian Rupees (₹). Prices may include service fees and taxes unless otherwise mentioned.",
  },
  {
    title: "Payment",
    content:
      "Payment may be collected by SWT or the Service Provider. Options include cards, UPI, and net banking. Pre-authorization may apply.",
  },
  {
    title: "Booking Policies",
    content:
      "Policies vary by provider. Some may allow free cancellation, others may not. Please review terms before confirming.",
  },
  {
    title: "Refunds",
    content:
      "Refunds, if applicable, are processed in ₹ to the original method of payment.",
  },
  {
    title: "Account & Communication",
    content:
      "Do not share your login. Communications related to bookings may be sent via email, SMS, or WhatsApp.",
  },
  {
    title: "Travel Requirements",
    content:
      "Users are responsible for ensuring valid ID, visas, and other travel documents.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content on SWT is protected and may not be copied or reused without permission.",
  },
  {
    title: "Liability",
    content:
      "SWT is not liable for provider issues, delays, or service failures.",
  },
  {
    title: "Dispute Resolution",
    content:
      "Disputes will first be handled by our support team. Unresolved issues will follow arbitration under Indian law.",
  },
  {
    title: "Governing Law",
    content:
      "These terms are governed by Indian law, with exclusive jurisdiction in Bengaluru, Karnataka.",
  },
  {
    title: "Contact Us",
    content: (
      <>
        Email: skipwithtrips@gmail.com <br />
        Phone: +91-8527958951 <br />
        Website: www.skipwithtrips.com
      </>
    ),
  },
  {
    title: "Glossary",
    content: (
      <>
        <strong>Non-refundable:</strong> No refund on cancellation. <br />
        <strong>Free cancellation:</strong> Cancel without charges within the specified period. <br />
        <strong>Pay at property:</strong> Payment at the check-in point.
      </>
    ),
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function TermsConditions() {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-20 text-black font-sans">

      {/* 🧾 Floating Contract Icon (Top Left) */}
      <div className="absolute top-10 left-0 opacity-10 w-32 h-32 md:w-52 md:h-52 pointer-events-none z-0">
        <svg viewBox="0 0 24 24" fill="#FF6700" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M19 2H8a2 2 0 0 0-2 2v16l4-4h9a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
        </svg>
      </div>

      {/* 🛡️ Floating Shield Icon (Bottom Right) */}
      <div className="absolute bottom-0 right-0 opacity-10 w-32 h-32 md:w-48 md:h-48 pointer-events-none z-0">
        <svg viewBox="0 0 24 24" fill="#FFA000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M12 2 4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3Z" />
        </svg>
      </div>

      {/* Main container */}
      <motion.div
        className="relative max-w-5xl mx-auto z-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF512F] to-[#DD2476] drop-shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
             Terms & Conditions? 📜 <em className="italic">read them.</em>
          </motion.h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            because using our service means you agree with the rules. so yeah, it matters.
          </p>
        </div>

        {/* Animated Sections */}
        <div className="space-y-12">
          {termsSections.map((section, idx) => (
            <motion.section
              key={idx}
              className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-md border border-gray-300 hover:shadow-2xl transition-shadow"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Title level={3} className="!text-[#FF4000] mb-4 tracking-tight">
                {section.title}
              </Title>
              <Paragraph className="text-base md:text-lg text-gray-800 leading-relaxed text-balance">
                {section.content}
              </Paragraph>
              {section.list && (
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                  {section.list.map((item, i) => (
                    <li key={i} className="text-base">{item}</li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        {/* Last updated */}
        <Paragraph className="text-center text-sm text-gray-400 mt-16">
          Last updated: July, 2025
        </Paragraph>
      </motion.div>

      {/* 📱 Sticky Footer */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-between items-center px-6 py-3 z-50 shadow-md">
        <p className="text-sm text-gray-500">Need help or have questions?</p>
        <button
          className="bg-[#FF4000] text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          onClick={() => window.location.href = '/contact_us'}
        >
          Need Help?
        </button>
      </div>
    </div>
  );
}
