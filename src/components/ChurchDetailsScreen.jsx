import React from 'react';

export function ChurchDetailsScreen({ church, onNavigate, onToggleFavorite }) {
  if (!church) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">No church selected</p>
      </div>
    );
  }

  const handleDirections = () => {
    const address = encodeURIComponent(church.address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${church.phone}`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md flex items-center justify-between">
        <button
          onClick={() => onNavigate('list')}
          className="text-white text-xl"
        >
          ←
        </button>
        <button
          onClick={() => onToggleFavorite(church.id)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
            church.isFavorite ? 'bg-red-500' : 'bg-white/30'
          }`}
        >
          <span className="text-xl">{church.isFavorite ? '❤️' : '🤍'}</span>
        </button>
      </div>

      {/* Church Photo */}
      <div className="h-48 flex items-center justify-center border-b bg-gray-100 overflow-hidden">
        {church.image ? (
          <img 
            src={church.image} 
            alt={church.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <span className="text-6xl">⛪</span>
            <p className="text-gray-500 text-xs mt-2">[Church Photo]</p>
          </div>
        )}
      </div>

      {/* Church Details */}
      <div className="flex-1 overflow-y-auto p-5 bg-white">
        <h2 className="text-2xl font-bold text-gray-900">{church.name}</h2>
        <p className="text-sm text-gray-600 mt-1">{church.distance} away • {church.status}</p>
        <p className="text-sm text-blue-600 mt-1">{church.denomination}</p>

        <div className="mt-6">
          <h3 className="text-base font-bold text-gray-800 mb-2">📍 Address</h3>
          <p className="text-sm text-gray-700">{church.address}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-base font-bold text-gray-800 mb-2">🕐 Service Times</h3>
          {church.serviceTimes.map((time, index) => (
            <p key={index} className="text-sm text-gray-700 mt-1">
              • {time}
            </p>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-base font-bold text-gray-800 mb-2">📞 Contact</h3>
          <a href={`tel:${church.phone}`} className="text-sm text-blue-600 block mt-1">
            {church.phone}
          </a>
          <a 
            href={`https://${church.website}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-blue-600 block mt-1"
          >
            {church.website}
          </a>
        </div>

        {church.accessibility && church.accessibility.length > 0 && (
          <div className="mt-6">
            <h3 className="text-base font-bold text-gray-800 mb-2">♿ Accessibility</h3>
            {church.accessibility.map((feature, index) => (
              <p key={index} className="text-sm text-gray-700 mt-1">
                • {feature}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t bg-white flex gap-3">
        <button 
          onClick={handleDirections}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-sm font-bold hover:bg-blue-700 transition"
        >
          Get Directions
        </button>
        <button 
          onClick={handleCall}
          className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-lg text-sm font-bold hover:bg-blue-50 transition"
        >
          Call Now
        </button>
      </div>
    </div>
  );
}