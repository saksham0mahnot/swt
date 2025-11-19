import { Typography } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import tickIcon from "../../assets/genZ_trip/tick.svg";
import crossIcon from "../../assets/genZ_trip/no.svg";
const { Title, Paragraph } = Typography;

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const PrivacyPolicy = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-6 py-12"
      >
        {/* Header */}
        <Title level={1} className="text-center text-3xl md:text-4xl mb-3">
          <span className="text-white">Cancellation</span>{" "}
          <span className="text-orange-500">Policy</span>
        </Title>
        <Paragraph
          className="text-center !text-white !text-[20px] !mb-10 !mt-5"
          style={{ letterSpacing: "0.05em" }}
        >
          We respect your privacy. All personal information collected during the
          booking process is kept confidential and <br />
          used only to ensure smooth trip coordination. By booking with us, you
          agree to our use of your details strictly for trip-related
          communication and updates.
        </Paragraph>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 !mt-20">
          {/* Sidebar */}
          <div className="text-sm md:text-base space-y-6 border-r border-gray-700 pr-4">
            <p
              onClick={() => setActiveTab("tab1")}
              className={`${
                activeTab === "tab1"
                  ? "text-orange-500 border-l-2 border-orange-500"
                  : "text-gray-400 hover:text-white"
              } pl-2 cursor-pointer transition-all duration-200`}
            >
              Cancellation & Refund Policy
            </p>
            <p
              onClick={() => setActiveTab("tab2")}
              className={`${
                activeTab === "tab2"
                  ? "text-orange-500 border-l-2 border-orange-500"
                  : "text-gray-400 hover:text-white"
              } pl-2 cursor-pointer transition-all duration-200`}
            >
              How we use your information
            </p>
          </div>
          {/* Main Content */}
          <div className="md:col-span-3 space-y-10">
            {/* Cancellation Section */}
            {activeTab === "tab1" && (
              <div>
                <h2 className="text-xl text-medium mb-4">
                  Cancellation & Refund Policy
                </h2>

                <div className="bg-[#111] ml-3 p-6 rounded-xl shadow-lg space-y-4">
                  <h3 className="text-lg">Package Cancellation Policy</h3>
                  <p className="text-green-400 text-sm ">
                    *Cancellation Possible till 4th August, 2025.
                  </p>
                  <p className="text-gray-400 text-sm mb-6">
                    After that Package is Non-Refundable.
                  </p>

                  {/* Timeline */}
                  <div className="relative py-10">
                    <div className="absolute w-full  h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 top-13 transform -translate-y-1/2 rounded-full "></div>
                    <div className="flex justify-between items-start text-sm relative z-10">
                      <div className="text-center w-1/2">
                        <img
                          src={tickIcon}
                          alt="tick"
                          className="w-6 h-6 mx-auto mb-2"
                        />
                        <p className="text-green-400 ">Till 4th August, 2025</p>
                        <p className="text-gray-300 mt-2">
                          <strong>50%</strong> of the trip cost will be
                          <br />
                          charged as cancellation fees.
                        </p>
                      </div>

                      <div className="text-center w-1/2">
                        <img
                          src={crossIcon}
                          alt="cross"
                          className="w-6 h-6 mx-auto mb-2"
                        />
                        <p className="text-red-400">From 5th August, 2025</p>
                        <p className="text-gray-300 mt-2">
                          <strong>100%</strong> of the trip cost will be
                          <br />
                          charged as cancellation fees.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="space-y-3 text-gray-300 text-sm leading-relaxed mt-4">
                    <p>
                      • No refund shall be made concerning the initial booking
                      amount for any cancellations.
                    </p>
                    <p>
                      • In the case of unforeseen weather conditions or
                      government restrictions, certain activities may be
                      canceled, and in such cases, the operator will try his
                      best to provide an alternate feasible activity. However,
                      no refund will be provided for the same.
                    </p>
                    <p>
                      • In the case of unforeseen weather conditions or
                      government restrictions, certain activities may be
                      canceled, and in such cases, the operator will try his
                      best to provide an alternate feasible activity. However,
                      no refund will be provided for the same.
                    </p>
                  </div>
                </div>

                {/* Date Change Section */}
                <div className="mt-10">
                  <h3 className="text-lg mb-2">Package Date Change Policy</h3>
                  <p className="text-gray-300 ml-3 text-sm">
                    Due to unforeseen circumstances, date change is possible. We
                    will inform you about the date change, in the future.
                  </p>
                </div>
              </div>
            )}

            {/* How we use your Information */}
            {activeTab === "tab2" && (
              <div>
                <h3 className="text-2xl mb-2">How we use your Information</h3>
                <p className="text-gray-300 ml-3 text-xl">
                  We use your personal information to provide you with a
                  personalized and efficient experience. This may include
                  sending you notifications, updates, and relevant information
                  about your trip. <br />
                  <br />
                  Your data helps us analyze usage trends and customer behavior
                  to improve our website features, content, and overall
                  experience. <br />
                  <br />
                  We may access your information to resolve disputes, respond to
                  inquiries, and provide timely customer support. <br />
                  <br />
                  With your consent, we may use your information to send
                  promotional offers, travel tips, and special discounts
                  relevant to your interests. <br />
                  <br />
                  In certain cases, we may be required to share your information
                  to comply with legal processes or enforce our policies.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
