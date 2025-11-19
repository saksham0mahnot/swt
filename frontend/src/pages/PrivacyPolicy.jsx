import React, { useEffect } from "react";
import { Typography } from 'antd';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

const policySections = [
  {
    title: 'Introduction',
    text: 'At Skip With Trips (SWT), your privacy is our priority. This policy details how we handle your personal information when you use our services.',
  },
  {
    title: 'What Information Do We Collect?',
    text: 'We may collect personal information like your name, email, location, device info, and interactions with our platform to enhance your experience.',
    list: ['Email address', 'Browser/device data', 'Usage patterns'],
  },
  {
    title: 'How Is Your Information Used?',
    text: 'Your information helps us improve our services, personalize content, and communicate important updates. We do not sell your data.',
    list: ['Improve UX', 'Respond to inquiries', 'Ensure security'],
  },
  {
    title: 'Do We Share Your Data?',
    text: 'Nope! We do not sell or rent your data. We may share it with trusted partners under strict confidentiality — only when absolutely necessary.',
  },
  {
    title: 'Cookies & Tracking',
    text: 'We use cookies 🍪 to understand user behavior and preferences. You can manage cookies through your browser settings.',
  },
  {
    title: 'Your Rights',
    text: 'You have the right to access, correct, or delete your data. We respect your privacy and choices at all times.',
    list: ['Access your data', 'Request deletion', 'Withdraw consent'],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function PrivacyPolicy() {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-20 text-black font-sans">
      {/* 🔒 Floating Lock SVG */}
      <div className="absolute top-0 right-0 opacity-10 w-40 h-40 md:w-60 md:h-60 pointer-events-none z-0">
        <svg
          viewBox="0 0 24 24"
          fill="#FF4000"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6-7h-1V7a5 5 0 0 0-10 0v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM9 7a3 3 0 0 1 6 0v3H9V7Zm9 13H6v-8h12v8Z" />
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
            privacy? it's 🔒 <em className="italic">serious.</em>
          </motion.h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            your time is valuable. but so is your data. <br /> here’s everything you need to know.
          </p>
        </div>

        {/* Consent Callout */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              it starts with <em className="italic text-[#FF4000]">your consent.</em>
            </h2>
          </div>
        </div>

        {/* Animated Sections */}
        <div className="space-y-12">
          {policySections.map((section, idx) => (
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
                {section.text}
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
          Last updated: June, 2025
        </Paragraph>
      </motion.div>

      {/* 📱 Sticky Footer */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-between items-center px-6 py-3 z-50 shadow-md">
        <p className="text-sm text-gray-500">Need help or have questions?</p>
        <button
          className="bg-[#FF4000] text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          // onClick={() => window.alert('We’ll connect you to support soon!')}
          onClick={() => window.location.href = '/contact_us'}
        >
          Need Help?
        </button>
      </div>
    </div>
  );
}
