import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const steps = [
  "Choose your destination",
  "Set your travel dates",
  "Plan your daily activities",
  "Book accommodation",
  "Arrange transportation",
  "Pack and prepare",
];

const curvePath = (direction) => {
  if (direction === "right") {
    return "M0 0 C 40 40, 40 80, 0 120";
  } else {
    return "M40 0 C 0 40, 0 80, 40 120";
  }
};

export default function ItineraryGuide() {
  return (
    <div className="w-full p-8 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto">
        <Title level={3} className="text-center mb-12 text-orange-600">
          Itinerary Planning Guide
        </Title>
        <div className="flex flex-col items-center">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex w-full max-w-2xl items-center ${
                  isEven ? "justify-start" : "justify-end"
                } mb-16 relative hover:transform hover:scale-105 transition-transform duration-300`}
              >
                <Card
                  className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-orange-200"
                  style={{ width: "300px", borderRadius: "12px" }}
                  styles={{ body: { padding: "16px" } }}
                  // bodyStyle={{ padding: '16px' }}
                >
                  <Title level={4} className="mb-2 text-orange-500">
                    Step {index + 1}
                  </Title>
                  <Paragraph className="mb-0 text-gray-700">{step}</Paragraph>
                </Card>

                {index !== steps.length - 1 && (
                  <svg
                    className={`absolute top-full ${
                      isEven ? "-right-16" : "-left-16"
                    } hidden sm:block`}
                    width="40"
                    height="120"
                    viewBox="0 0 40 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ overflow: "visible" }}
                  >
                    <path
                      d={curvePath(isEven ? "right" : "left")}
                      stroke="#f97316"
                      strokeWidth="3"
                      fill="transparent"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        <style>{`
          @media (max-width: 640px) {
            .flex.w-full.max-w-2xl.items-center {
              justify-content: center !important;
            }
            svg {
              display: none !important;
            }
            div > div > div:not(:last-child) {
              border-left: 3px solid #f97316;
              margin-left: calc(300px / 2 - 1.5px);
              padding-left: 16px;
              margin-bottom: 24px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
