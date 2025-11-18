// src/pages/Events.tsx
import React, { useMemo } from "react";
import { upcomingEvents } from "../data/events";

const Events: React.FC = () => {
  // Highlight Revival if present
  const { featured, others } = useMemo(() => {
    const feat = upcomingEvents.find(e => e.id.toLowerCase().includes("revival")) || null;
    const rest = upcomingEvents.filter(e => feat ? e.id !== feat.id : true);
    return { featured: feat, others: rest };
  }, []);

  return (
    <div className="py-12 px-6 max-w-5xl mx-auto">
      <h3 className="text-3xl font-semibold text-blue-700 mb-6 text-center">Upcoming Events</h3>

      {/* Featured Revival */}
      {featured && (
        <section className="mb-10">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow">
            <span className="inline-block rounded bg-blue-700 px-2 py-1 text-xs font-semibold text-white mb-3">
              Featured
            </span>
            <h4 className="text-2xl font-bold text-blue-800">{featured.title}</h4>
            <p className="text-blue-900/90 mt-1">
              {[featured.date, featured.time].filter(Boolean).join(" • ")}
            </p>
            <p className="mt-3 text-gray-700">
              Join us for a special time of renewal and encounter. Invite a friend!
            </p>
            <div className="mt-4">
              <a
                href={featured.href || "/events"}
                className="inline-block rounded bg-blue-700 px-4 py-2 text-white font-semibold hover:bg-blue-600"
              >
                More Details
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Other events as cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {others.map(e => (
          <div key={e.id} className="rounded-lg border p-5 shadow-sm hover:shadow">
            <h5 className="text-xl font-semibold text-blue-700">{e.title}</h5>
            {(e.date || e.time) && (
              <p className="text-gray-700 mt-1">
                {[e.date, e.time].filter(Boolean).join(" • ")}
              </p>
            )}
            <div className="mt-4">
              <a
                href={e.href || "/events"}
                className="inline-block rounded border border-blue-200 bg-white px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-50"
              >
                Details
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* If there are no others and no featured, show a friendly message */}
      {!featured && others.length === 0 && (
        <p className="text-center text-gray-600 mt-8">No upcoming events yet. Please check back soon.</p>
      )}
    </div>
  );
};

export default Events;
