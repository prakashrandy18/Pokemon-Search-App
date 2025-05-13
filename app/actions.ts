'use server';

import {
  getAllPokemon,
  getPokemonByType,
  getPokemonDetails,
  getPokemonTypes,
  getPokemonWithDetails,
} from '@/lib/api';

export async function searchPokemon(
  type: string,
  name: string
): Promise<any[]> {
  try {
    const response = type
      ? await getPokemonByType(type)
      : await getAllPokemon(20);
    let filteredResults = response.results;
    if (name && name.trim() !== '') {
      filteredResults = response.results.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    const limitedResults = filteredResults.slice(0, 20);
    const pokemonDetails = await getPokemonWithDetails(limitedResults);
    return pokemonDetails;
  } catch (error) {
    console.error('Error in searchPokemon server action:', error);
    return [];
  }
}

export async function fetchPokemonTypes(): Promise<string[]> {
  try {
    return await getPokemonTypes();
  } catch (error) {
    console.error('Error fetching Pokemon types:', error);
    return [];
  }
}

export async function fetchPokemonDetails(name: string): Promise<any | null> {
  try {
    return await getPokemonDetails(name);
  } catch (error) {
    console.error(`Error fetching details for Pokemon ${name}:`, error);
    return null;
  }
}
