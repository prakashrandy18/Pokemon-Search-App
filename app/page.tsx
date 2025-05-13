'use client';

import { useState } from 'react';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import SearchForm from '@/components/SearchForm';
import PokemonGrid from '@/components/PokemonGrid';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const { displayedPokemon, loading } = usePokemonSearch(
    selectedType,
    searchTerm
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Pokemon Search App
      </h1>

      <SearchForm
        onSearch={handleSearch}
        onTypeChange={handleTypeChange}
        selectedType={selectedType}
        searchTerm={searchTerm}
      />

      <PokemonGrid pokemon={displayedPokemon} loading={loading} />
    </main>
  );
}
