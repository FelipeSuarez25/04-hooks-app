import { useEffect, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  imageURl: string;
}

interface Props {
  id: number;
}

export const usePokemon = ({ id }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setisLoading] = useState(true);

  const getPokemonId = async (id: number) => {
    setisLoading(true);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    setPokemon({
      id: id,
      name: data.name,
      imageURl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    });

    setisLoading(false);
  };

  useEffect(() => {
    getPokemonId(id);
  }, [id]);

  return {
    //props
    isLoading,
    pokemon,

    formattedId: id.toString().padStart(3, "0"),
  };
};
