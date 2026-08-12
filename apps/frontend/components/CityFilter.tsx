import React from 'react';

interface CityFilterProps {
  cities: string[];
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const CityFilter: React.FC<CityFilterProps> = ({ cities, selectedCity, onSelectCity }) => {
  return (
    <select
      className="kz-select"
      value={selectedCity}
      onChange={(e) => onSelectCity(e.target.value)}
    >
      <option value="">All Cities</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
};

export default CityFilter;
