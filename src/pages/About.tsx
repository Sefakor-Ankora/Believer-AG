import React from "react";
import { useSEO } from "../hooks/useSEO";

const About: React.FC = () => {
  useSEO({
    title: "About | Believers Temple AG",
    description: "Learn about our mission, vision, and what we believe at Believers Temple Assemblies of God.",
    image: "/images/about-placeholder.jpg",
  });

  return (
    <div className="py-12 px-8 text-center">
      <h3 className="text-3xl font-semibold text-blue-700 mb-4">About Believers Temple AG</h3>
      <p className="max-w-3xl mx-auto text-gray-700">
        Believers Temple Assemblies of God is a community of believers devoted to worship, service, and spiritual growth.
        We exist to glorify God, strengthen families, and make disciples of all nations.
      </p>
      <img src="/images/about-placeholder.jpg" alt="About our church" className="mx-auto mt-6 w-96 h-64 object-cover rounded shadow" />
    </div>
  );
};

export default About;
