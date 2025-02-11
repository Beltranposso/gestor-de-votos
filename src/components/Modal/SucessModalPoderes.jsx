import React from 'react';
import { CheckCircle } from 'lucide-react';

export function SuccessMessage() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 text-center">
        Delegación de poderes exitosa
      </h3>
    </div>
  );
}