import {
  Wifi,
  Mountain,
  Wind,
  Info,
  CheckCircle,
  Users,
  Sun,
} from "lucide-react";
import { Button } from "antd";

export default function Component() {
  return (
    <div className=" mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        <Button
          variant="default"
          size="sm"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4"
        >
          All rooms
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full px-4 bg-transparent"
        >
          1 Bed
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full px-4 bg-transparent"
        >
          2 Beds
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full px-4 bg-transparent"
        >
          3+ Beds
        </Button>
      </div>

      {/* Results Count */}
      <div className="text-right text-sm text-gray-600 mb-4">
        Showing 6 to 6 rooms
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Room Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600258881099-e78a5e3b77ff?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Sparrow Room (Deluxe)"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Room Content */}
            <div className=" relative bg-white  p-4 rounded-tl-3xl shadow-sm border border-gray-200 -mt-4">
              {/* Room Title */}
              <h3 className="font-semibold text-gray-900 mb-2">
                Sparrow Room (Deluxe)
              </h3>
              {/* Availability Badge */}
              <div className="flex items-center gap-1 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">
                  Instant booking available
                </span>
              </div>
              {/* Room Details */}
              <div className="flex flex-col sm:flex-row gap-6 mb-4">
                {/* Accommodates */}
                <div className="flex-1">
                  <h4 className="font-semibold mb-2 text-sm">Accommodates</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Maximum total</span>
                      <span className="ml-auto font-medium">3</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Replace with a lounge icon if you have one */}
                      <span className="inline-block w-5 h- rounded-full flex items-center justify-center">
                        ⎈
                      </span>
                      <span>In lounge</span>
                      <span className="ml-auto font-medium">2</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mountain className="w-4 h-4" />
                      <span>Mountain View</span>
                    </div>
                  </div>
                </div>
                {/* Amenities */}
                <div className="flex-1">
                  <h4 className="font-semibold mb-2 text-sm">Amenities</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      {/* Replace with a sun/skylight icon if you have one */}
                      <Sun className="w-4 h-4" />
                      <span>Skylight</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4" />
                      <span>Free Wifi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4" />
                      <span>Fully Air Conditioned</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Refundable Badge */}
              <div className="flex items-center gap-1 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">Fully Refundable</span>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mb-4">before Wed, 26 Jun</p>
              {/* More Details Link */}
              <button className="text-blue-600 text-sm hover:underline mb-4">
                More Details ›
              </button>
              {/* Extras Section */}
              <div className="border-t pt-3 mb-4">
                <h4 className="font-medium text-sm mb-2">Extras</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>No Extras</span>
                    <span>+ ₹0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Breakfast</span>
                    <span>+ ₹800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Breakfast + Lunch + Dinner</span>
                    <span>+ ₹2,000</span>
                  </div>
                </div>
              </div>
              {/* Bedding Section */}
              <div className="border-t pt-3 mb-4">
                <h4 className="font-medium text-sm mb-2">Bedding</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>One Person with no bed</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>One Person with bed</span>
                    <span>+ ₹1,000</span>
                  </div>
                </div>
              </div>
              {/* Cancellation Policy */}
              <div className="border-t pt-3 mb-4">
                <h4 className="font-medium text-sm mb-2">
                  Cancellation Policy
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  Read cancellation policy details
                </p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Fully refundable before 15 Jan</span>
                    <span className="ml-auto">+ ₹0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>50% refundable after 15 Jan</span>
                    <span className="ml-auto">+ ₹0</span>
                  </div>
                </div>
              </div>
              {/* Price */}
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-gray-900">₹9,800</div>
                <div className="text-xs text-gray-500">₹22,098 total</div>
                <div className="text-xs text-gray-500">
                  includes taxes & fees
                </div>
              </div>
              {/* Reserve Button */}
              <Button className="w-full !bg-orange-500 hover:!bg-orange-600 !text-white font-semibold !px-8 !py-3 md:px-10 md:py-4 !rounded-full  md:text-lg transition-all duration-200 hover:!shadow-lg transform hover:-translate-y-0.5 hover:!border-orange-600">
                Reserve Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
