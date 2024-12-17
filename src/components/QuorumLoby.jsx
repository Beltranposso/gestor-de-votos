import React from 'react';

export const QuorumList = ({ attendees='', totalRequired,quorumtoal }) => {
  
  const percentage = (attendees.length / totalRequired) * 100;

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quórum Actual</h2>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">
         {quorumtoal}%
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className='flex w-full justify-between'>
        <p className="text-sm text-gray-600 mt-2">
          {percentage.toFixed(2)}% de quórum alcanzado.
        </p>
        <p className='ext-sm text-gray-600 '>quorum minimo 51%</p>

        </div>
      </div>
    </div>
  );
};

export default QuorumList;
