import { Typography } from "antd";
import img1 from "../../assets/genZ_trip/genZ_cloud_bg_img1.webp";
import img2 from "../../assets/genZ_trip/genZ_cloud_bg_img2.webp";
import genzTripBg from "../../assets/genZ_trip/genZ_cloud_bg.webp";
// import genzTripBg2 from "../../assets/genZ_trip/genZ_mountain_bg.svg";

const { Title, Paragraph } = Typography;

const ExploreSection = () => {
  return (
    <div
      className="bg-gray-200 bg-cover bg-center py-16 px-6 sm:px-10 lg:px-0"
      style={{ backgroundImage: `url(${genzTripBg})` }}
    >
      <div className="max-w-full mx-auto">
        {/* Top Text Section */}
        <div className=" w-full text-left mb-15 px-20 max-[525px]:px-3">
          <h2 className="text-6xl max-[450px]:text-xl max-[525px]:text-5xl font-bold text-black mb-2 max-[450px]:mb-0">
            Explore Manali
          </h2>
          <p className="text-4xl max-[450px]:text-base max-[525px]:text-3xl text-gray-700">
            Like never Before
          </p>
        </div>

        {/* Bottom Image Cards */}
        <div className="w-full overflow-hidden">
          <div className="flex gap-6 animate-scroll-x hover:[animation-play-state:paused] w-max">
            {/* Set of images repeated twice for infinite scroll illusion */}
            {[img1, img2, img1, img2, img1, img2, img1, img2, img1, img2].map(
              (img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Scroll-${index}`}
                  className="rounded-md shadow-md border border-white object-cover max-[450px]:w-[200px] max-[450px]:h-[130px] max-[525px]:w-[400px] max-[525px]:h-[330px]"
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
