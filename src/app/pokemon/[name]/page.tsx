import PokemonCard from "@/components/PokemonCard";
import { PokemonResponse } from "@/lib/types";
import axios from "axios";
import Link from "next/link";

interface PokemonDetailsProps {
  params: { name: string };
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

      <PokemonCard pokemon={pokemon} />
    </div>
  );
};

export default PokemonDetails;
