import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { getImage } from "../../../../lib/utils";

interface PokemonDetailsProps {
  params: { name: string };
}

export interface PokemonResponse {
  name: string;
  url: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  species: {
    url: string;
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

const fetchPokemon = async (name: string): Promise<PokemonResponse> => {
  const response = await axios.get<PokemonResponse>(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );
  return response.data;
};

const PokemonDetails = async ({ params }: PokemonDetailsProps) => {
  const pokemon = await fetchPokemon(params.name);

  return (
    <div className="p-4">
      <nav className="mb-4">
        <Link href="/" className="text-blue-500">
          Home
        </Link>{" "}
        &gt; {pokemon.name}
      </nav>
      <h1 className="text-2xl font-bold mb-4">{pokemon.name}</h1>
      <p>{pokemon.url}</p>
      <Image
        src={getImage(pokemon.species.url)}
        alt={pokemon.name}
        width={200}
        height={200}
      />
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetails;
