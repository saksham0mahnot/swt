import { Link } from "react-router-dom";
import { Typography } from "antd";

const { Title } = Typography;

const popularPlaces = [
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
    title: "Mountain Adventure",
    description:
      "Discover breathtaking peaks and pristine wilderness on our guided mountain expeditions.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
    title: "Ocean Paradise",
    description:
      "Dive into crystal-clear waters and explore vibrant coral reefs in tropical destinations.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop",
    title: "Forest Retreat",
    description:
      "Reconnect with nature in serene forest sanctuaries and peaceful hiking trails.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=600&fit=crop",
    title: "City Escape",
    description:
      "Experience the thrill of urban exploration in bustling metropolises around the world.",
  },
];

export default function PopularDestinations() {
  return (
    <section className=" py-12 mx-4 px-7 my-4 bg-white rounded-2xl shadow-xl">
      <Title level={2} className="text-center mb-8">
        Popular Destinations
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularPlaces.map((place, index) => (
          <div
            key={index}
            className="relative bg-white rounded-3xl shadow-md overflow-hidden flex flex-col justify-between hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={place.image}
              alt={place.title}
              className="w-full h-100 object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
              <div className="container mx-auto">
                <h2 className="text-3xl sm:text-3xl lg:text-2xl font-bold mb-2 sm:mb-3 animate-fadeIn">
                  {place.title}
                </h2>
                <p className="text-base sm:text-lg lg:text-sm mb-4 sm:mb-6 animate-fadeIn animation-delay-300 max-w-full sm:max-w-2xl">
                  {place.description}
                </p>
              </div>
            </div>

            {/* <div className="p-4">
              <Link to={`/destinations/${place.title.toLowerCase()}`}>
                <button className="!bg-gradient-to-r !from-orange-600 !to-red-600 !to-orange-600 !border-none !shadow-lg hover:!shadow-xl !rounded-xl !px-6 sm:!px-8 !py-2 !h-10 sm:!h-12 !text-sm sm:!text-base !font-semibold !text-white hover:!scale-105 !transition-all !duration-300 relative overflow-hidden group">
                  <span className="relative z-10">Explore</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </Link>
            </div> */}
          </div>
        ))}
      </div>
    </section>
  );
}

// {

// }
//  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {popularPlaces.map((place, index) => (
//             <Card
//               key={index}
//               hoverable
//               cover={
//                 <img
//                   alt={place.title}
//                   src={place.image}
//                   className="h-48 object-cover"
//                 />
//               }
//               className="shadow-lg"
//             >
//               <Card.Meta
//                 title={place.title}
//                 description={place.description}
//               />
//               <div className="mt-4">
//                 <Link to={`/destinations/${place.title.toLowerCase()}`}>
//                   <Button type="primary" block>
//                     Explore
//                   </Button>
//                 </Link>
//               </div>
//             </Card>
//           ))}
//         </div>
