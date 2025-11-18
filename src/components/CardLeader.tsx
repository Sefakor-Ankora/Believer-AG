import React from "react";

type Props = {
  photo: string;
  name: string;
  line1?: string;
  line2?: string;
};

const CardLeader: React.FC<Props> = ({ photo, name, line1, line2 }) => (
  <div className="bg-white p-4 rounded shadow text-center w-full max-w-xs">
    <img src={photo} alt={name} className="w-32 h-32 mx-auto rounded-full object-cover mb-3" />
    <h5 className="text-xl font-semibold text-blue-800">{name}</h5>
    {line1 && <p className="text-gray-600 mt-1">{line1}</p>}
    {line2 && <p className="text-gray-600 text-sm mt-1">{line2}</p>}
  </div>
);

export default CardLeader;
