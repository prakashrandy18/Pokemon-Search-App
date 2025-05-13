import { useState, useEffect } from 'react';
import { fetchPokemonTypes } from '@/app/actions';

export function usePokemonTypes() {
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPokemonTypes() {
      try {
        setLoading(true);
        const pokemonTypes = await fetchPokemonTypes();
        setTypes(pokemonTypes);
        setError(null);
      } catch (err) {
        setError('Failed to load Pokemon types');
        console.error('Error in usePokemonTypes:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPokemonTypes();
  }, []);

  return { types, loading, error };
}
