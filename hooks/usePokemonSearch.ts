import { useState, useEffect } from 'react';
import { searchPokemon } from '@/app/actions';

export function usePokemonSearch(selectedType: string, searchTerm: string) {
  const [allPokemon, setAllPokemon] = useState<any[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<any[]>([]);
  const [displayedPokemon, setDisplayedPokemon] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        setLoading(true);
        const results = await searchPokemon(selectedType, searchTerm);
        setDisplayedPokemon(results);
        setError(null);
      } catch (err) {
        setError('Failed to load Pokemon');
        console.error('Error in usePokemonSearch:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();
  }, [selectedType,searchTerm]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPokemon(allPokemon);
    } else {
      const filtered = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  }, [allPokemon, searchTerm]);
  // useEffect(() => {
  //   async function fetchPokemonDetails() {
  //     try {
  //       setLoading(true);
  //       const pokemonToDisplay = filteredPokemon.slice(0, 10);
  //       const pokemonWithDetails = await getPokemonWithDetails(
  //         pokemonToDisplay
  //       );
  //       setDisplayedPokemon(pokemonWithDetails);
  //     } catch (err) {
  //       setError('Failed to load Pokemon details');
  //       console.error('Error fetching Pokemon details:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (filteredPokemon.length > 0) {
  //     fetchPokemonDetails();
  //   } else {
  //     setDisplayedPokemon([]);
  //   }
  // }, [filteredPokemon]);

  return {
    allPokemon,
    filteredPokemon,
    displayedPokemon,
    loading,
    error,
  };
}
