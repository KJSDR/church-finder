import React from 'react';

export function FiltersScreen({ filters, onFiltersChange, onNavigate }) {
  const toggleFilter = (category, value) => {
    const currentFilters = filters[category];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value];
    
    onFiltersChange({
      ...filters,
      [category]: newFilters
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header - Always Visible */}
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-center">Church Finder</h1>
      </div>

      {/* Filter Options */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Denomination */}
        <div className="mb-6">
          <h2 className="font-bold mb-3 text-gray-800">Denomination</h2>
          {['Catholic', 'Protestant', 'Orthodox', 'Non-denominational', 'Episcopal', 'Methodist', 'Baptist', 'Presbyterian', 'Lutheran', 'African Methodist Episcopal', 'Adventist'].map(denom => (
            <label key={denom} className="flex items-center mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.denominations.includes(denom)}
                onChange={() => toggleFilter('denominations', denom)}
                className="w-5 h-5 mr-3 text-blue-500 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{denom}</span>
            </label>
          ))}
        </div>

        <hr className="my-4 border-gray-200" />

        {/* Service Times */}
        <div className="mb-6">
          <h2 className="font-bold mb-3 text-gray-800">Service Times</h2>
          {['Sunday Morning', 'Sunday Evening', 'Weekday Services'].map(time => (
            <label key={time} className="flex items-center mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.serviceTimes.includes(time)}
                onChange={() => toggleFilter('serviceTimes', time)}
                className="w-5 h-5 mr-3 text-blue-500 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{time}</span>
            </label>
          ))}
        </div>

        <hr className="my-4 border-gray-200" />

        {/* Accessibility */}
        <div className="mb-6">
          <h2 className="font-bold mb-3 text-gray-800">Accessibility</h2>
          {['Wheelchair Access', 'ASL Interpretation'].map(access => (
            <label key={access} className="flex items-center mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.accessibility.includes(access)}
                onChange={() => toggleFilter('accessibility', access)}
                className="w-5 h-5 mr-3 text-blue-500 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{access}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Bar - Always Visible */}
      <div className="px-4 py-3 flex gap-2 bg-white border-t">
        <button className="flex-1 px-5 py-2 border-2 border-blue-700 bg-blue-700 text-white rounded-full text-sm font-medium">
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
        <button
          onClick={() => onNavigate('favorites')}
          className="flex-1 px-5 py-2 border-2 border-blue-700 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-50 transition"
        >
          Favorites
        </button>
      </div>
    </div>
  );
}