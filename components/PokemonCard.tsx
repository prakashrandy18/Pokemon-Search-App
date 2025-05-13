import Image from 'next/image';
import Link from 'next/link';

export default function PokemonCard({ pokemon }: { pokemon: any }) {
  const formattedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const imageUrl =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default;

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
        <div className="relative w-full h-48">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={formattedName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'contain', padding: '0.5rem' }}
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">No image</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{formattedName}</h2>
          <button className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
            Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}
