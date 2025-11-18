// src/components/Hero.tsx
import React from "react";
import { Link } from "react-router-dom";

interface HeroProps {
  image?: string;
  overlay?: boolean;     // dim image if true
  showActions?: boolean; // show CTA buttons if true
}

const Hero: React.FC<HeroProps> = ({
  image = "/images/church_banner.jpg",
  overlay = false,
  showActions = false,
}) => (
  <section
    className="relative bg-top bg-no-repeat bg-cover text-white text-center min-h-[320px] md:min-h-[420px]"
    style={{ backgroundImage: `url('${image}')` }}
    aria-label="Church banner"
  >
    {overlay && <div className="absolute inset-0 bg-blue-900/40" />}
    {showActions && (
      <div className="relative z-10 pt-24 pb-10">
        <div className="mt-6 space-x-4">
          <Link
            to="/events"
            className="bg-white text-blue-700 font-semibold px-4 py-2 rounded shadow hover:bg-blue-100"
          >
            Join an Event
          </Link>
          <Link
            to="/give"
            className="bg-blue-800 text-white font-semibold px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Give Online
          </Link>
        </div>
      </div>
    )}
  </section>
);

export default Hero;
