// src/components/FlashEvents.tsx  (shows title + date/time when available)
import React from "react";
import { Link } from "react-router-dom";
import { upcomingEvents } from "../data/events";


const FlashEvents: React.FC = () => {
  const phraseList = [...upcomingEvents, ...upcomingEvents];

  return (
    <section className="relative bg-blue-50 border-t border-b border-blue-100" aria-label="Upcoming events ticker">
      <style>{`
        @keyframes marqueeX { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: inline-flex; width: max-content; animation: marqueeX 20s linear infinite; }
        .marquee:hover .marquee-track { animation-play-state: paused; }
      `}</style>

      <div className="container mx-auto flex items-center gap-3 px-4 py-2">
        <span className="inline-flex shrink-0 items-center rounded bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
          Upcoming
        </span>

        <div className="marquee relative flex-1 overflow-hidden whitespace-nowrap">
          <div className="marquee-track will-change-transform">
            {phraseList.map((e, idx) => (
              <span key={`${e.id}-${idx}`} className="inline-flex items-center gap-3 pr-8 py-1">
                <span className="text-blue-900 font-semibold">{e.title}</span>
                {(e.date || e.time) && (
                  <span className="text-blue-700/80 text-sm">
                    {e.date ? e.date : ""}{e.date && e.time ? " • " : ""}{e.time ? e.time : ""}
                  </span>
                )}
                <Link to={e.href || "/events"} className="inline-block rounded bg-blue-700 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-600">
                  Details
                </Link>
                <span className="text-blue-300">•</span>
              </span>
            ))}
          </div>
        </div>

        <Link to="/events" className="hidden sm:inline-block shrink-0 rounded border border-blue-200 bg-white px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-50">
          View all
        </Link>
      </div>
    </section>
  );
};

export default FlashEvents;
