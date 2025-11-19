import React from "react";

const MapSection = () => {
  return (
    <div className="rounded-lg overflow-hidden w-full h-48 md:h-[222px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26997.52173210319!2d77.16652023572391!3d32.2395066783636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39048708163fd03f%3A0x8129a80ebe5076cd!2sManali%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1751457290911!5m2!1sen!2sin"
        width="100%"
        height=" 100%"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full"
      ></iframe>

      <p className="text-sm text-gray-600 mb-1">
        N 21.2°Ranga, Cancun, Quintana Roo, Mexico, 77500
      </p>
      <button className="text-blue-600 hover:underline text-sm">
        View the map →
      </button>
    </div>
  );
};

export default MapSection;
