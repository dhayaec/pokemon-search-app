"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImage } from "../lib/utils";
import { fetchPokemonTypes, fetchPokemons } from "../redux/pokemonSlice";
import { AppDispatch, RootState } from "../redux/store";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonByType {
  pokemon: Pokemon;
}

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { types, pokemons } = useSelector((state: RootState) => state.pokemon);
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);

  useEffect(() => {
    setFilteredPokemons(pokemons); // Initialize filtered list with all Pokémon
  }, [pokemons]);

  useEffect(() => {
    dispatch(fetchPokemonTypes());
    dispatch(fetchPokemons());
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );

    setFilteredPokemons(filteredPokemons); // Update local state or dispatch an action
  };

  const handleTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;

    if (selectedType === "") {
      setFilteredPokemons(pokemons); // Show all Pokémon if no type is selected
    } else {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/type/${selectedType}`
      );
      const typeFilteredPokemons = response.data.pokemon.map(
        (p: PokemonByType) => ({
          name: p.pokemon.name,
          url: p.pokemon.url,
        })
      );

      setFilteredPokemons(typeFilteredPokemons); // Update local state or dispatch an action
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokemon Search</h1>
      <div className="flex gap-4 mb-4">
        <select className="p-2 border rounded" onChange={handleTypeChange}>
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="p-2 border rounded"
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredPokemons.map((pokemon) => (
          <a
            key={pokemon.name}
            href={`/pokemon/${pokemon.name}`}
            className="p-4 border rounded shadow hover:bg-gray-100"
          >
            <Image
              src={getImage(pokemon.url)}
              alt={pokemon.name}
              width={200}
              height={200}
            />
            <h2 className="text-lg font-semibold">{pokemon.name}</h2>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Home;
