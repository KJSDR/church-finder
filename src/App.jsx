import React, { useState, useEffect } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { FiltersScreen } from "./components/FiltersScreen";
import { ListViewScreen } from "./components/ListViewScreen";
import { ChurchDetailsScreen } from "./components/ChurchDetailsScreen";
import { FavoritesScreen } from "./components/FavoritesScreen";
import churchesData from "./data/churches.json";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedChurch, setSelectedChurch] = useState(null);
  const [churches, setChurches] = useState([]);
  const [filteredChurches, setFilteredChurches] = useState([]);
  const [filters, setFilters] = useState({
    denominations: [],
    serviceTimes: [],
    accessibility: [],
  });
  const [searchLocation, setSearchLocation] = useState("");

  // Load churches on mount
  useEffect(() => {
    setChurches(churchesData.churches);
    setFilteredChurches(churchesData.churches);
  }, []);

  // Apply filters whenever filters change
  useEffect(() => {
    let filtered = [...churches];

    // Filter by denomination
    if (filters.denominations.length > 0) {
      filtered = filtered.filter(church => 
        filters.denominations.includes(church.denomination)
      );
    }

    // Filter by service times
    if (filters.serviceTimes.length > 0) {
      filtered = filtered.filter(church => {
        const hasRequestedTime = filters.serviceTimes.some(timeFilter => {
          if (timeFilter === "Sunday Morning") {
            return church.serviceTimes.some(time => 
              time.includes("Sunday") && 
              (time.includes("AM") || parseInt(time) < 12)
            );
          }
          if (timeFilter === "Sunday Evening") {
            return church.serviceTimes.some(time => 
              time.includes("Sunday") && time.includes("PM")
            );
          }
          if (timeFilter === "Weekday Services") {
            return church.serviceTimes.some(time => 
              !time.includes("Sunday") && !time.includes("Saturday")
            );
          }
          return false;
        });
        return hasRequestedTime;
      });
    }

    // Filter by accessibility
    if (filters.accessibility.length > 0) {
      filtered = filtered.filter(church => {
        return filters.accessibility.every(accessFilter => 
          church.accessibility && church.accessibility.includes(accessFilter)
        );
      });
    }

    setFilteredChurches(filtered);
  }, [filters, churches]);

  const toggleFavorite = (churchId) => {
    setChurches((prev) =>
      prev.map((church) =>
        church.id === churchId
          ? { ...church, isFavorite: !church.isFavorite }
          : church,
      ),
    );
    
    // Update selected church if it's the one being favorited
    if (selectedChurch && selectedChurch.id === churchId) {
      setSelectedChurch(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  const navigateToScreen = (screen, church) => {
    setCurrentScreen(screen);
    if (church) {
      setSelectedChurch(church);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <HomeScreen
            churches={filteredChurches}
            searchLocation={searchLocation}
            onSearchLocationChange={setSearchLocation}
            onNavigate={navigateToScreen}
          />
        );
      case "filters":
        return (
          <FiltersScreen
            filters={filters}
            onFiltersChange={setFilters}
            onNavigate={navigateToScreen}
          />
        );
      case "list":
        return (
          <ListViewScreen
            churches={filteredChurches}
            onNavigate={navigateToScreen}
            onToggleFavorite={toggleFavorite}
          />
        );
      case "favorites":
        return (
          <FavoritesScreen
            churches={churches}
            onNavigate={navigateToScreen}
            onToggleFavorite={toggleFavorite}
          />
        );
      case "details":
        return (
          <ChurchDetailsScreen
            church={selectedChurch}
            onNavigate={navigateToScreen}
            onToggleFavorite={toggleFavorite}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-md mx-auto h-full bg-white shadow-lg">
        {renderScreen()}
      </div>
    </div>
  );
}