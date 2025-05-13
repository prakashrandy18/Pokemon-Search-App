'use client';

import { useState, FormEvent, useCallback, useEffect } from 'react';
import { usePokemonTypes } from '@/hooks/usePokemonTypes';
import { debounce } from 'lodash';

export default function SearchForm({
  onSearch,
  onTypeChange,
  selectedType,
  searchTerm,
}: {
  onSearch: (term: string) => {};
  onTypeChange: (value: string) => {};
  selectedType: string;
  searchTerm: string;
}) {
  const { types, loading: typesLoading } = usePokemonTypes();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 300),
    []
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="md:flex md:gap-4">
        {/* Pokemon Type Select */}
        <div className="mb-4 md:mb-0 md:flex-1">
          <label
            htmlFor="pokemon-type"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Pokémon Type
          </label>
          <select
            id="pokemon-type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            disabled={typesLoading}
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="md:flex-1">
          <label
            htmlFor="search-pokemon"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Search Pokémon
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search-pokemon"
              className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by name..."
              value={localSearchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setLocalSearchTerm(value);
                debouncedSearch(value);
              }}
            />
            <button
              type="submit"
              className="absolute right-2.5 bottom-1.5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 h-[70%]"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
