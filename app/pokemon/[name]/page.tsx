import { fetchPokemonDetails } from '@/app/actions';
import Breadcrumb from '@/components/Breadcrumb';
import PokemonDetails from '@/components/PokemonDetails';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const pokemon = await fetchPokemonDetails(params.name);

  if (!pokemon) {
    return {
      title: 'Pokémon Not Found',
    };
  }

  const formattedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return {
    title: `${formattedName} | Pokémon App`,
    description: `View details for ${formattedName}`,
  };
}

export default async function PokemonPage({ params }: any) {
  const pokemon = await fetchPokemonDetails(params.name);

  if (!pokemon) {
    notFound();
  }

  const formattedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const breadcrumbItems = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: formattedName,
      href: `/pokemon/${params.name}`,
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      <PokemonDetails pokemon={pokemon} />
    </main>
  );
}
