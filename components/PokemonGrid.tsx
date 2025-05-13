import PokemonCard from './PokemonCard';
import GridLoader from './GridLoader';

export default function PokemonGrid({
  pokemon,
  loading,
}: {
  pokemon: any;
  loading: boolean;
}) {
  if (loading) {
    return <GridLoader />;
  }

  if (pokemon.length === 0) {
    return (
      <div className="mt-8 text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-lg text-gray-500">
          No Pokémon found. Try a different search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {pokemon.map((pokemon: any) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
