import React from 'react';

export function HomeScreen({ churches, searchLocation, onSearchLocationChange, onNavigate }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-center">Find Churches</h1>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-white border-b">
        <div className="relative">
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => onSearchLocationChange(e.target.value)}
            placeholder="Enter location or use current"
            className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
            <span className="text-white text-sm">📍</span>
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="px-4 py-3 flex gap-2 bg-white border-b">
        <button
          onClick={() => onNavigate('filters')}
          className="px-5 py-2 border-2 border-blue-500 text-blue-500 rounded-full text-sm font-medium hover:bg-blue-50 transition"
        >
          Filters
        </button>
        <button className="px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-medium">
          Map
        </button>
        <button
          onClick={() => onNavigate('list')}
          className="px-5 py-2 border-2 border-gray-300 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition"
        >
          List
        </button>
      </div>

      {/* Simple Map Area with CSS */}
      <div className="flex-1 m-4 bg-gradient-to-br from-blue-100 via-blue-50 to-green-50 rounded-lg relative overflow-hidden shadow-inner border border-gray-200">
        {/* Map grid lines for effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
            {[...Array(36)].map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>

        {/* Map label */}
        <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded shadow-sm">
          <p className="text-xs text-gray-600 font-medium">San Francisco, CA</p>
        </div>

        {/* Church pins */}
        <div className="relative h-full w-full">
          {churches.map((church, index) => (
            <button
              key={church.id}
              onClick={() => onNavigate('details', church)}
              className="absolute group"
              style={{
                left: `${25 + (index * 13) % 60}%`,
                top: `${25 + (index * 17) % 55}%`,
              }}
            >
              {/* Pin */}
              <div className="relative">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-125 shadow-lg border-2 border-white">
                  <span className="text-white text-xs">⛪</span>
                </div>
                {/* Pin shadow */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-black/20 rounded-full blur-sm"></div>
                
                {/* Hover tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {church.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Results counter */}
        <div className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded shadow-sm">
          <p className="text-xs text-gray-600">{churches.length} churches nearby</p>
        </div>
      </div>
    </div>
  );
}