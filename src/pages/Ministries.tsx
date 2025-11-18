import React from "react";
import MinistryCard from "../components/MinistryCard";
import { ministries } from "../data/ministries";

const Ministries: React.FC = () => {
  return (
    <div className="py-12 px-6 max-w-6xl mx-auto">
      <h3 className="text-3xl font-semibold text-blue-700 mb-6 text-center">Departments</h3>
      <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10">
        Explore our departments and discover how you can get involved.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ministries.map((m) => (
          <MinistryCard key={m.id} item={m} />
        ))}
      </div>
    </div>
  );
};

export default Ministries;