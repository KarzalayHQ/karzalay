import React from 'react';

interface SearchInputProps {
  query: string;
  onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ query, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search companies..."
      className="kz-search"
      value={query}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchInput;

