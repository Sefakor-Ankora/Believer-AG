import React from "react";
import { leadershipData } from "../data/leadership";
import CardLeader from "../components/CardLeader";
import { useSEO } from "../hooks/useSEO";

const Leadership: React.FC = () => {
  useSEO({
    title: "Leadership | Believers Temple AG",
    description: "Meet the Senior Pastor, Associate Pastors, Church Board, and Departmental Leaders of Believers Temple AG.",
    image: "/images/senior-pastor-placeholder.jpg",
  });

  const { seniorPastor, associatePastors, board, departmentalLeaders } = leadershipData;

  return (
    <div className="py-12 px-8 text-center">
      <h3 className="text-3xl font-semibold text-blue-700 mb-6">Our Leadership</h3>

      <section className="mb-12">
        <h4 className="text-2xl font-semibold text-blue-600 mb-4">Senior Pastor</h4>
        <div className="flex flex-col items-center">
          <CardLeader
            photo={seniorPastor.photo}
            name={seniorPastor.name}
            line1={seniorPastor.title}
            line2={seniorPastor.bio}
          />
        </div>
      </section>

      <section className="mb-12">
        <h4 className="text-2xl font-semibold text-blue-600 mb-4">Associate Pastors</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {associatePastors.map((p, i) => (
            <CardLeader key={i} photo={p.photo} name={p.name} line1={p.title} line2={p.bio} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h4 className="text-2xl font-semibold text-blue-600 mb-4">Church Board Members</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {board.map((b, i) => (
            <CardLeader key={i} photo={b.photo} name={b.name} line1={b.title} />
          ))}
        </div>
      </section>

      <section>
        <h4 className="text-2xl font-semibold text-blue-600 mb-4">Departmental Leaders</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {departmentalLeaders.map((d, i) => (
            <CardLeader key={i} photo={d.photo} name={`${d.dept} Leader`} line1={d.name} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Leadership;
