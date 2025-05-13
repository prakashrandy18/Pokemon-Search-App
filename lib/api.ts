import {
  Pokemon,
  PokemonListResponse,
  PokemonTypeResponse,
  PokemonTypeDetailResponse,
} from '@/types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Fetch all Pokemon types
export async function getPokemonTypes(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/type`);

    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon types');
    }

    const data: PokemonTypeResponse = await response.json();

    // Filter out "unknown" and "shadow" types as they're not traditional Pokemon types
    return data.results
      .map((type) => type.name)
      .filter((name) => name !== 'unknown' && name !== 'shadow');
  } catch (error) {
    console.error('Error fetching Pokemon types:', error);
    return [];
  }
}

// Fetch all Pokemon (with limit)
export async function getAllPokemon(limit = 151): Promise<PokemonListResponse> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);

    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon list');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching all Pokemon:', error);
    return { count: 0, next: null, previous: null, results: [] };
  }
}

// Fetch Pokemon by type
export async function getPokemonByType(
  type: string
): Promise<PokemonListResponse> {
  try {
    const response = await fetch(`${BASE_URL}/type/${type}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon of type ${type}`);
    }

    const data: PokemonTypeDetailResponse = await response.json();

    // Convert the response to match PokemonListResponse format
    const results = data.pokemon.map((item) => ({
      name: item.pokemon.name,
      url: item.pokemon.url,
    }));

    return {
      count: results.length,
      next: null,
      previous: null,
      results,
    };
  } catch (error) {
    console.error(`Error fetching Pokemon by type ${type}:`, error);
    return { count: 0, next: null, previous: null, results: [] };
  }
}

// Fetch individual Pokemon details
export async function getPokemonDetails(name: string): Promise<Pokemon | null> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${name}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch details for Pokemon ${name}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching details for Pokemon ${name}:`, error);
    return null;
  }
}

// Function to get a small batch of Pokemon with details for display
export async function getPokemonWithDetails(
  pokemonList: { name: string; url: string }[]
): Promise<Pokemon[]> {
  try {
    const pokemonPromises = pokemonList.map((pokemon) =>
      getPokemonDetails(pokemon.name)
    );

    const results = await Promise.all(pokemonPromises);
    return results.filter((pokemon): pokemon is Pokemon => pokemon !== null);
  } catch (error) {
    console.error('Error fetching Pokemon details batch:', error);
    return [];
  }
}
