import { Layout } from "antd";
import { Link, NavLink } from "react-router-dom";

import {
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  XOutlined,
} from "@ant-design/icons";
import skwtLogo from "../assets/skwt.png";

const { Footer } = Layout;

export default function FooterSection() {
  return (
    <Footer
      className="relative bg-black text-white pt-12 pb-6"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
        {/* Logo and Nav */}
        <div className="md:col-span-1 max-[767px]:flex max-[767px]:flex-col max-[767px]:items-center">
          <img
            src={skwtLogo}
            alt="Skip With Trips"
            className="h-[177px] w-100% mb-4 brightness-0 invert max-[767px]:w-[300px] max-[767px]:object-contain"
          />
          <div className="mt-6 text-[18px] w-full">
            <NavLink
              to="/about_us"
              className="block w-50 py-2 border-b border-white transition-all"
            >
              <span className="inline-block w-full px-4 py-1 text-white text-left hover:text-white hover:bg-gradient-to-r hover:from-[#841504] hover:to-[#FF4000] rounded-r-full transition-all">
                About Us
              </span>
            </NavLink>

            <NavLink
              to="/genZtrip"
              className="block w-50 py-2 border-b border-white transition-all"
            >
              <span className="inline-block w-full px-4 py-1 text-white text-left hover:text-white hover:bg-gradient-to-r hover:from-[#841504] hover:to-[#FF4000] rounded-r-full transition-all">
                Our Offerings
              </span>
            </NavLink>

            <NavLink
              to="/contact_us"
              className="block w-50 py-2 border-b border-white transition-all"
            >
              <span className="inline-block w-full px-4 py-1 text-white text-left hover:text-white hover:bg-gradient-to-r hover:from-[#841504] hover:to-[#FF4000] rounded-r-full transition-all">
                Connect With Us
              </span>
            </NavLink>
          </div>
        </div>

        {/* Our Socials */}
        <div className="footer-container max-[767px]:text-center max-[767px]:!mt-5">
          <h4 className="text-[#FF4000] mb-4 text-right text-[18px] max-[767px]:text-center">
            Our Socials
          </h4>
          <ul className="space-y-2 text-right max-[767px]:text-center">
            <li>
               <div className="flex items-center gap-2 text-white justify-end text-[18px] max-[767px]:justify-center">
                <InstagramOutlined className="text-[18px] !text-white" />{" "}
                <a
                  href="https://www.instagram.com/skipwithtrips?igsh=MTY0OTFwYTdvYXVsdQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:!text-[#FF7043] !text-white"
                >
                  skipwithtrips
                </a>
              </div>

            </li>
            <li>
              <div className="flex items-center gap-2 text-white justify-end text-[18px] max-[767px]:justify-center">
                <LinkedinOutlined className="text-[18px] !text-white" />{" "}
                <a
                  href="https://www.linkedin.com/company/skipwithtrips/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:!text-[#FF7043] !text-white"
                >
                  skipwithtrips
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2 text-white justify-end text-[18px] max-[767px]:justify-center">
                <XOutlined className="text-[18px] !text-white" />{" "}
                <a
                  href="https://x.com/skipwithtrips?t=sLmWSETXgJHmxWtg7PWksQ&s=09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:!text-[#FF7043] !text-white"
                >
                  skipwithtrips
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Helpful Links */}
        <div className="footer-container max-[767px]:text-center max-[767px]:!mt-5">
          <h4 className="text-[#FF4000] mb-4 text-[18px] max-[767px]:text-center">
            Helpful Links
          </h4>
          <ul className="space-y-2 max-[767px]:text-center">
            {/* <li>
              <Link
                to="/services"
                className="!text-white hover:!text-[#FF7043] text-[18px]"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/offerings"
                className="!text-white hover:!text-[#FF7043] text-[18px]"
              >
                Our Offerings
              </Link>
            </li> */}
            <li>
              <Link
                to="/contact_us"
                className="!text-white hover:!text-[#FF7043] text-[18px]"
              >
                Customer Support
              </Link>
            </li>
            <li>
              <Link
                to="/coming_soon"
                className="!text-white hover:!text-[#FF7043] text-[18px]"
              >
                Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/#packages"
                onClick={(e) => {
                  e.preventDefault();
                  const packagesSection = document.getElementById('packages');
                  if (packagesSection) {
                    // const yOffset = -2;
                    const y = packagesSection.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  } else {
                    window.location.href = '/#packages';
                  }
                }}
                className="!text-white hover:!text-[#FF7043] text-[18px]"
              >
                Packages
              </Link>
            </li>
          </ul>
        </div>

        {/* More */}
        <div className="footer-container max-[767px]:text-center max-[767px]:!mt-5">
          <h4 className="text-[#FF4000] mb-4 text-right text-[18px] max-[767px]:text-center">
            More
          </h4>
          <ul className="space-y-2 text-right max-[767px]:text-center">
            {/* <li>
              <Link
                to="/faqs"
                className="!text-white hover:!text-[#FF7043] text-[18px]"
              >
                FAQs
              </Link>
            </li> */}
            <li>
              <Link
                to="/privacy-policy"
                className="!text-white hover:!text-[#FF7043] text-[18px]"
              >
                Privacy Policy
              </Link>
            </li>
            {/* <li>
              <Link
                to="/unsubscribe"
                className="!text-white hover:!text-[#FF7043] text-[18px]"
              >
                Unsubscribe
              </Link>
            </li> */}
            {/* <li>
              <Link
                to="/services"
                className="!text-white hover:!text-[#FF7043] text-[18px]"
              >
                Customer Services
              </Link>
            </li> */}
            <li>
              <Link
                to="/terms_and_conditions"
                className="!text-white hover:!text-[#FF7043] text-[18px]"
              >
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-4 grid grid-cols-1 md:grid-cols-12 gap-8 text-white mt-12 max-[767px]:text-center ">
        {/* Contact us */}
        <div className="md:col-span-5 max-[767px]:text-center">
          <h4 className="text-[#FF4000] mb-2 text-[18px]">Contact</h4>
          <p className="text-[18px] text-white">+91 8527958951</p>
          <p className="text-[18px] text-white">skipwithtrips@gmail.com</p>
          <p className="text-[18px] mt-2 text-white">
            Christ University, Delhi NCR
            <br />
            Mariam Nagar, Ghaziabad
            <br />
            Uttar Pradesh 201003
          </p>
        </div>

        {/* Subscribe Section */}
        <div className="md:col-span-5 max-[767px]:!mt-5">
          <div className="w-full">
            <p className="text-[18px] mb-4 text-white">
              Subscribe for more Info
            </p>
            <div className="bg-white p-4 rounded-lg shadow-lg w-full">
              <h5 className="text-black text-[24px] font-bold mb-2">
                Keep In Touch
              </h5>
              <p className="text-black text-[16px] mb-4">
                Stay in touch with us and share your experience and tell us how
                we can improve.
              </p>
              <div className="flex items-center gap-2 max-[415px]:flex-col">
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-lg w-full">
                  <MailOutlined className="text-black-500 text-[16px] !text-black" />
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    className="bg-transparent focus:outline-none px-3 py-1 w-full !text-gray-700 text-[16px]"
                  />
                </div>
                <button className="bg-[#FF4000] text-white px-6 py-2 rounded-lg hover:!bg-opacity-50 transition text-[18px] max-[400px]:text-[14px] whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className=" px-4 mt-8 pt-8 border-t border-white">
        <div className="relative flex justify-center items-center">
          <p className="text-white text-[18px] max-[767px]:text-[15px] max-[555px]:text-[10.5px] max-[400px]:text-[9.5px]">
            Copyright © 2025 SkipWithTrips.com | All rights reserved
          </p>
          {/* <div className="absolute right-0 flex items-center">
            <SecurityScanOutlined className="text-[18px] !text-white hover:text-[#FF4000] cursor-pointer" />
          </div> */}
        </div>
      </div>
    </Footer>
  );
}
