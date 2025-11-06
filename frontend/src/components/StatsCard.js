import React from "react";

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center text-white`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
