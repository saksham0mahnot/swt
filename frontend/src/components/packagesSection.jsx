import React from "react";
import swt_secure from "../assets/SWT_secure.svg";
import { Pin } from "lucide-react";

const PackagePage = () => {
  // const [searchData, setSearchData] = useState({
  //   from: "Mumbai",
  //   to: "Nepal",
  //   date: "",
  //   travelers: 6,
  // });

  const packages = [
    {
      id: 1,
      image: "https://www.ahstatic.com/photos/8855_ho_00_p_2048x1536.jpg",
      duration: "3 Nights",
      title: "Novotel Goa: Goa",
      description:
        "Relax in the heart of Goa with luxury amenities, poolside leisure, and a short walk to Candolim Beach.",
      price: "₹9,099",
      location: "Goa",
    },
    {
      id: 2,
      image:
        "https://cdn.shopify.com/s/files/1/0757/0253/4444/files/35_480x480.jpg?v=1706514639",
      duration: "2 Nights",
      title: "Wildlense Wild Retreat: Pilibhit Tiger Reserve",
      description:
        "Stay amidst nature at Pilibhit Tiger Reserve with jungle safaris, nature walks, and eco-stays in the wild.",
      price: "₹9,099",
      location: "Pilibhit Tiger Reserve",
    },
    {
      id: 3,
      image:
        "https://www.corbett-national-park.com/hotel-images/corbett-aroma-park1.webp",
      duration: "2 Nights",
      title: "Corbett Aroma Park: Jim Corbett",
      description:
        "Experience wildlife and tranquility near Jim Corbett with guided safaris, cozy lodging, and scenic views.",
      price: "₹9,099",
      location: "Jim Corbett",
    },
    {
      id: 4,
      image:
        "https://lh3.googleusercontent.com/p/AF1QipMC1i3gDZYXKcDQ7RUEmkK622yl_cNkUjfXXFBZ=s680-w680-h510-rw",
      duration: "3 Nights",
      title: "The Himalayan: Manali",
      description:
        "A luxurious castle-style stay in Manali offering panoramic views, fine dining, and alpine elegance.",
      price: "₹9,099",
      location: "Manali",
    },
  ];
  return (
    <div id="packages" className="bg-white py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mt-8 mb-25">
            Explore our <span className="text-orange-600">Trusted</span>{" "}
            Packages
          </h2>
        </div>
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="relative w-full max-w-[180px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[266px] h-[300px] sm:h-[400px] md:h-[410px] lg:h-[450px] rounded-xl overflow-hidden shadow-lg group"
            >
              {/* Background Image */}
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-3 py-4 flex flex-col justify-end text-white">
                {/* Diamond Icon */}
                <div className="absolute top-3 right-3">
                  {/* <Pin className="w-7 h-7 [filter:brightness(0)_invert(1)] dark:[filter:none] transition-all duration-200 opacity-70 hover:opacity-100" /> */}
                  <img
                    src={swt_secure}
                    alt="Verified Package"
                    className="w-12 [filter:brightness(0)_invert(1)] dark:[filter:none] transition-all duration-200 opacity-100 hover:scale-120"
                  />
                </div>

                {/* Duration */}
                <div className="text-xs sm:text-sm font-medium mb-1">
                  {pkg.duration}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug mb-1">
                  {pkg.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/90 mb-2 line-clamp-3 leading-tight">
                  {pkg.description}
                </p>

                {/* Price + Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="text-sm md:text-xl sm:text-base font-semibold">
                    {pkg.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagePage;
