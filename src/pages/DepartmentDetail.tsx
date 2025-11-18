import React, { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ministries } from "../data/ministries";
import { useSEO } from "../hooks/useSEO";

const DepartmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ministry = useMemo(() => ministries.find((m) => m.id === (id || "")), [id]);

  if (!ministry) {
    return <Navigate to="/departments" replace />;
  }

  useSEO({
    title: `${ministry.name} | Believers Temple AG`,
    description: ministry.short || `Learn more about ${ministry.name} at Believers Temple AG`,
    image: ministry.image,
  });

  return (
    <div className="py-12 px-6 max-w-5xl mx-auto">
      <nav className="text-sm mb-4">
        <Link to="/departments" className="text-blue-700 hover:underline">← Back to Departments</Link>
      </nav>

      <div className="rounded-lg overflow-hidden shadow bg-white">
        <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
          <img src={ministry.image} alt={ministry.name} className="absolute inset-0 h-full w-full object-cover object-center" />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-blue-800">{ministry.name}</h1>
          {ministry.short && <p className="text-gray-600 mt-1">{ministry.short}</p>}
          <p className="text-gray-700 mt-4 whitespace-pre-line">{ministry.description}</p>

          {/* Optional call-to-action area */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="inline-block rounded bg-blue-700 px-4 py-2 text-white font-semibold hover:bg-blue-600"
            >
              Contact Department
            </a>
            <a
              href="/events"
              className="inline-block rounded border border-blue-200 bg-white px-4 py-2 text-blue-700 font-semibold hover:bg-blue-50"
            >
              Upcoming Activities
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;