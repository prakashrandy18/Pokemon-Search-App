import { useState, useEffect } from 'react';
import {
  getAllPokemon,
  getPokemonByType,
  getPokemonWithDetails,
} from '@/lib/api';
import { searchPokemon } from '@/app/actions';

export function usePokemonSearch(selectedType: string, searchTerm: string) {
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
  }, [selectedType, searchTerm]);

  return {
    displayedPokemon,
    loading,
    error,
  };
}
