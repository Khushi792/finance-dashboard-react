import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const SummaryCard = ({ title, amount, change, icon, trend }) => {
  const Icon = icon;
  const isPositive = trend === 'up';

  return (
    <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">

      {/* Glow effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-300 ${
        isPositive ? 'bg-green-400' : 'bg-red-400'
      } blur-xl`} />

      <div className="flex justify-between items-center relative z-10">

        {/* Left Content */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>

          {/* Amount with animation */}
          <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white transition-all duration-300 group-hover:scale-105">
            ₹{amount.toLocaleString()}
          </p>

          {/* Trend */}
          <div className={`flex items-center mt-2 text-sm font-medium transition-all duration-300 ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>

            {isPositive ? (
              <FaArrowUp className="mr-1 animate-bounce" />
            ) : (
              <FaArrowDown className="mr-1 animate-bounce" />
            )}

            <span>{change}% from last month</span>
          </div>
        </div>

        {/* Icon */}
        <div className={`p-4 rounded-full transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6 ${
          isPositive
            ? 'bg-green-100 text-green-600 dark:bg-green-900/30'
            : 'bg-red-100 text-red-600 dark:bg-red-900/30'
        }`}>
          <Icon size={26} />
        </div>
      </div>

      {/* Bottom animated bar */}
      <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${
        isPositive ? 'bg-green-500' : 'bg-red-500'
      }`} />

    </div>
  );
};

export default SummaryCard;