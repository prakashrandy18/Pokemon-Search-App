import Image from 'next/image';
import { Pokemon } from '@/types/pokemon';

interface PokemonDetailsProps {
  pokemon: Pokemon;
}

function DetailItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex mb-1">
      <h1 className="font-bold mr-2">{label}: </h1>
      <span>{value}</span>
    </div>
  );
}

export default function PokemonDetails({ pokemon }: any) {
  const formattedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const imageUrl =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default;

  const types = pokemon.types.map((type: any) => type.type.name).join(', ');
  const stats = pokemon.stats.map((stat: any) => stat.stat.name).join(', ');
  const abilities = pokemon.abilities
    .map((ability: any) => ability.ability.name)
    .join(', ');
  const moves = pokemon.moves.map((move: any) => move.move.name).join(', ');

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-xl mx-auto">
      <div>
        <div className="md:w-full bg-gray-50 p-8 flex items-center justify-center">
          <div className="relative w-full h-64 sm:h-80">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={formattedName}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'contain' }}
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-500">No image</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <DetailItem value={pokemon.name} label={'Name'} />
          <DetailItem value={types} label={'Types'} />
          <DetailItem value={stats} label={'Stats'} />
          <DetailItem value={abilities} label={'Ability'} />
          <DetailItem value={moves} label={'Some Moves'} />
        </div>
      </div>
    </div>
  );
}
