import React from 'react';

export function ListViewScreen({ churches, onNavigate, onToggleFavorite }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md flex items-center">
        <button
          onClick={() => onNavigate('home')}
          className="text-white mr-4 text-xl"
        >
          ←
        </button>
        <h1 className="text-xl font-bold">Nearby Churches</h1>
      </div>

      {/* Church List */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {churches.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No churches match your filters</p>
            <button 
              onClick={() => onNavigate('filters')}
              className="mt-4 text-blue-500 underline"
            >
              Adjust filters
            </button>
          </div>
        ) : (
          churches.map((church) => (
            <div
              key={church.id}
              className="border-b bg-white p-4 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => onNavigate('details', church)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-base text-gray-900">{church.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {church.distance} • <span className={church.status === 'Open' ? 'text-green-700' : 'text-red-600'}>{church.status}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{church.address}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {church.serviceTimes[0]}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(church.id);
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition ml-2 ${
                    church.isFavorite ? 'bg-red-500' : 'bg-gray-300'
                  }`}
                >
                  <span className="text-white text-lg">{church.isFavorite ? '❤️' : '🤍'}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Results count */}
      {churches.length > 0 && (
        <div className="bg-white p-3 text-center border-t">
          <p className="text-gray-600 text-sm">
            Showing {churches.length} {churches.length === 1 ? 'church' : 'churches'}
          </p>
        </div>
      )}
    </div>
  );
}