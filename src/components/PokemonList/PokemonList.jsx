import { useEffect, useState } from "react";
import "./PokemonList.css";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [PokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const POKEDEX_URL = `https://pokeapi.co/api/v2/pokemon`;
  const [pokedexUrl, setPokedexUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon`
  );

  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  async function downloadPokemon() {
    setIsLoading(true);
    const response = await axios.get(pokedexUrl);

    const pokemonResults = response.data.results;

    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);
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
  }, [pokedexUrl]);
  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {isLoading
          ? "Loading...."
          : PokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={prevUrl == null}
          onClick={() => setPokedexUrl(prevUrl)}
        >
          Prev
        </button>
        <button
          disabled={nextUrl == null}
          onClick={() => setPokedexUrl(nextUrl)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
