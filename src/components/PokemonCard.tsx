import { PokemonResponse } from "@/lib/types";
import { getImage } from "@/lib/utils";
import Image from "next/image";

export default function PokemonCard({ pokemon }: { pokemon: PokemonResponse }) {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-teal-200 p-6 flex justify-center">
        <Image
          src={getImage(pokemon.species.url)}
          alt={pokemon.name}
          width={200}
          height={200}
        />
      </div>
      <div className="bg-yellow-200 p-4">
        <h2 className="text-lg font-bold text-gray-900">
          Name: <span className="font-medium">{pokemon.name}</span>
        </h2>
        <p className="text-gray-800">
          <span className="font-semibold">Type:</span>{" "}
          {pokemon.types.map((x) => x.type.name).join(",")}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Stats:</span>{" "}
          {pokemon.stats.map((x) => x.stat.name).join(",")}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Abilities:</span>{" "}
          {pokemon.abilities.map((x) => x.ability.name).join(",")}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Some Moves:</span>{" "}
          {pokemon.moves.map((x) => x.move.name).join(",")}
        </p>
      </div>
    </div>
  );
}
