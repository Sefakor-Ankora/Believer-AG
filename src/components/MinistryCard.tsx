import React from "react";
import { Link } from "react-router-dom";
import type { Ministry } from "../data/ministries";

type Props = {
  item: Ministry;
};

const MinistryCard: React.FC<Props> = ({ item }) => {
  return (
    <Link
      to={`/departments/${item.id}`}
      className="group relative w-full overflow-hidden rounded-lg bg-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`Open ${item.name}`}
    >
      <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4 text-left">
        <h5 className="text-lg font-semibold text-blue-800">{item.name}</h5>
        {item.short && <p className="text-gray-600 text-sm mt-1">{item.short}</p>}
        <span className="mt-3 inline-block text-sm font-medium text-blue-700 group-hover:underline">Learn more →</span>
      </div>
    </Link>
  );
};

export default MinistryCard;
