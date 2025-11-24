// src/pages/Home.tsx  (replace your current file with this simpler version)
import React from "react";
import Hero from "../components/Hero";
import FlashEvents from "../components/FlashEvents";
import CardLeader from "../components/CardLeader";
import { leadershipData } from "../data/leadership";
import { useSEO } from "../hooks/useSEO";
import GalleryCarousel from "../components/GalleryCarousel";

const Home: React.FC = () => {
  useSEO({
    title: "Believers Temple AG | Home",
    description:
      "Welcome to Believers Temple Assemblies of God, Accra. Join us for worship, teaching, community, and vibrant weekly services.",
    image: "/images/church_banner.jpg",
  });

  return (
    <>
      <Hero overlay={false} showActions={false} />
      <FlashEvents />

      {/* Left (Pastoral couple) | Right (Mission & Vision) */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="rounded-lg overflow-hidden shadow bg-white">
            <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
              <img
                src="/images/pastoral-couple.jpg"
                alt="Senior Pastor and Wife"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
            <div className="p-6 text-center">
              <h4 className="text-2xl font-semibold text-blue-800">
                {leadershipData.seniorPastor.name} & Mrs. Georgina Alordjiso
              </h4>
              <p className="text-gray-700 mt-2 max-w-3xl mx-auto">
                We warmly welcome you to Believers Temple AG. Join us as we worship, grow, and serve together in the
                love of Christ.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-semibold text-blue-700 mb-4">Our Mission</h3>
              <p className="text-gray-700 max-w-2xl">
                To reach the lost, disciple believers, and empower the church through the word of God and the Holy
                Spirit.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-3xl font-semibold text-blue-700 mb-4">Our Vision</h3>
              <p className="text-gray-700 max-w-2xl">
                To be a Christ-centered, Spirit-empowered church raising mature disciples who transform families,
                communities, and nations for God’s glory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-driven single-image carousel + lightbox */}
      <GalleryCarousel />

      {/* Leaders preview */}
      <section className="py-16 bg-white text-center">
        <h3 className="text-3xl font-semibold text-blue-700 mb-6">Meet Our Leaders</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center px-6">
          <CardLeader
            photo={leadershipData.seniorPastor.photo}
            name={leadershipData.seniorPastor.name}
            line1={leadershipData.seniorPastor.title}
          />
          <CardLeader
            photo={leadershipData.associatePastors[0].photo}
            name={leadershipData.associatePastors[0].name}
            line1={leadershipData.associatePastors[0].title}
          />
          <CardLeader
            photo={leadershipData.board[0].photo}
            name={leadershipData.board[0].name}
            line1={leadershipData.board[0].title}
          />
        </div>
        <div className="mt-8">
          <a
            href="/leadership"
            className="inline-block bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow hover:bg-blue-600"
          >
            View All Leaders
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
