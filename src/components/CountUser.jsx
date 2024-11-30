import React from 'react';
import { Users } from 'lucide-react';



export default function UserCount({ count }) {
  return (
    <div className="inline-flex items-center bg-gray-200 rounded-lg shadow-sm px-3  py-2">
      <Users className="h-5 w-5 text-black mr-2" />
      <span className="font-medium text-gray-900">{count}</span>
    </div>
  );
}