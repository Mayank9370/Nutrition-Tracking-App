import React from 'react';

export const Card = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-200 hover:shadow-xl ${
        onClick ? 'cursor-pointer hover:scale-[1.02]' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};