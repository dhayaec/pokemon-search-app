import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface PokemonState {
  types: Array<{ name: string; url: string }>;
  pokemons: Array<{ name: string; url: string }>;
  loading: boolean;
}

const initialState: PokemonState = {
  types: [],
  pokemons: [],
  loading: false,
};

export const fetchPokemonTypes = createAsyncThunk(
  "pokemon/fetchTypes",
  async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    return response.data.results;
  }
);

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=100"
    );
    return response.data.results;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonTypes.fulfilled, (state, action) => {
        state.types = action.payload;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.pokemons = action.payload;
      });
  },
});

export default pokemonSlice.reducer;
