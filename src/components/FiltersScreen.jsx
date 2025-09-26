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
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md flex items-center">
        <button
          onClick={() => onNavigate('home')}
          className="text-white mr-4 text-xl"
        >
          ← 
        </button>
        <h1 className="text-xl font-bold">Filters</h1>
      </div>

      {/* Filter Options */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Denomination */}
        <div className="mb-6">
          <h3 className="font-bold mb-3 text-gray-800">Denomination</h3>
          {['Catholic', 'Protestant', 'Orthodox', 'Non-denominational', 'Episcopal', 'Methodist', 'Baptist'].map(denom => (
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
          <h3 className="font-bold mb-3 text-gray-800">Service Times</h3>
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
          <h3 className="font-bold mb-3 text-gray-800">Accessibility</h3>
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

      {/* Apply Button */}
      <div className="p-4 border-t bg-white">
        <button
          onClick={() => onNavigate('home')}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}