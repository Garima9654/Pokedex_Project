import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(response);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
    });
  }

  useEffect(() => {
    downloadPokemon();
  }, []);
  return (
    <div className="pokemon-details-container">
      <div className="pokemon-details-box">
        <div className="pokemon-image">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
        <div className="pokemon-info">
          <div>Name: {pokemon.name}</div>
          <div>Weight: {pokemon.weight}</div>
          <div>Height: {pokemon.height}</div>
          <div className="pokemon-types">
            {pokemon.types &&
              pokemon.types.map((t) => (
                <div className="pokemon-type" key={t}>
                  {t}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
