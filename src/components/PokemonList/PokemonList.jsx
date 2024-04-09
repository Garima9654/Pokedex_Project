import { useEffect, useState } from "react";
import "./PokemonList.css";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [PokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const POKEDEX_URL = `https://pokeapi.co/api/v2/pokemon`;

  async function downloadPokemon() {
    const response = await axios.get(POKEDEX_URL);
    const pokemonResults = response.data.results;
    const pokemonPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemmonData = await axios.all(pokemonPromise);

    const res = pokemmonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });

    setPokemonList(res);
    console.log(pokemmonData);
    console.log(res);
    setIsLoading(false);
  }
  useEffect(() => {
    downloadPokemon();
  }, []);
  return (
    <div className="pokemon-list-wrapper">
      <div>List of Pokemons</div>
      {isLoading
        ? "Loading...."
        : PokemonList.map((p) => (
            <Pokemon name={p.name} image={p.image} key={p.id} />
          ))}
    </div>
  );
}

export default PokemonList;
