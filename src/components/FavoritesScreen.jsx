import React from 'react';

export function FavoritesScreen({ churches, onNavigate, onToggleFavorite }) {
  const favoriteChurches = churches.filter(church => church.isFavorite);

  return (
    <div className="h-full flex flex-col">
      {/* Header - Always Visible */}
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-center">Church Finder</h1>
      </div>

      {/* Favorites List */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {favoriteChurches.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">💔</div>
            <p className="text-gray-500 text-lg mb-2">No favorites yet</p>
            <p className="text-gray-400 text-sm mb-6">
              Tap the heart icon on any church to add it to your favorites
            </p>
            <button 
              onClick={() => onNavigate('list')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Browse Churches
            </button>
          </div>
        ) : (
          favoriteChurches.map((church) => (
            <div
              key={church.id}
              className="border-b bg-white p-4 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => onNavigate('details', church)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="font-bold text-base text-gray-900">{church.name}</h2>
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
                  className="w-10 h-10 rounded-full flex items-center justify-center transition ml-2 bg-red-500"
                >
                  <span className="text-white text-lg">❤️</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Favorites count */}
      {favoriteChurches.length > 0 && (
        <div className="bg-white p-3 text-center border-t">
          <p className="text-gray-600 text-sm">
            {favoriteChurches.length} {favoriteChurches.length === 1 ? 'favorite' : 'favorites'}
          </p>
        </div>
      )}

      {/* Bottom Navigation Bar - Always Visible */}
      <div className="px-4 py-3 flex gap-2 bg-white border-t">
        <button
          onClick={() => onNavigate('filters')}
          className="flex-1 px-5 py-2 border-2 border-blue-700 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-50 transition"
        >
          Filters
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="flex-1 px-5 py-2 border-2 border-blue-700 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-50 transition"
        >
          Map
        </button>
        <button
          onClick={() => onNavigate('list')}
          className="flex-1 px-5 py-2 border-2 border-blue-700 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-50 transition"
        >
          List
        </button>
        <button className="flex-1 px-5 py-2 border-2 border-blue-700 bg-blue-700 text-white rounded-full text-sm font-medium">
          Favorites
        </button>
      </div>
    </div>
  );
}