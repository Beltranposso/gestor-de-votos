import React from 'react';
import { SearchX, Sparkles, RefreshCw, Type } from 'lucide-react'

 const  UserNotFound = ({ searchTerm }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-full p-8 mb-6 shadow-lg shadow-green-100/50">
        <SearchX className="w-20 h-20 text-green-500 animate-pulse" />
      </div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
        No results found
      </h2>
      {searchTerm ? (
        <p className="text-lg text-gray-700 mb-6">
          No matches found for "<span className="font-medium text-blue-600">{searchTerm}</span>"
        </p>
      ) : (
        <p className="text-lg text-gray-700 mb-6">
          We couldn't find what you're looking for
        </p>
      )}
      <div className="max-w-md bg-white rounded-2xl p-6 shadow-xl border border-green-100">
        <p className="text-gray-700 font-medium mb-4">Try these search tips:</p>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-600">
            <Type className="w-5 h-5 text-green-500" />
            <span>Check for spelling mistakes</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span>Use fewer keywords</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <RefreshCw className="w-5 h-5 text-green-500" />
            <span>Try using different terms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserNotFound