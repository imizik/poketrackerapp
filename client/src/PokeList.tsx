import React from "react";

import PokeBallIcon from "./PokeBallIcon";
import styles from './styles/pokemon-types.module.css';

interface Pokemon {
    name: string;
    dex_number: number;
    type_1: string;
    type_2: string | null;
    image_url: string;
  }

type Props = {
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    pokemonList: Pokemon[]
};

export const PokeList = (props: Props) => {
  return (
    <div className="mt-4 w-9/12 grid gap-6 grid-cols-3">
      {props.pokemonList.map((pokemon) => {
        return (
            <div className="items-center rounded-lg flex flex-row justify-around bg-white">
                <PokeBallIcon/>
                <div className=" text-sm py-2 font-bold flex flex-col items-center"> 
                    <span className="capitalize">{pokemon.name}</span>
                    <span>#{pokemon.dex_number}</span>
                    <img className="w-3/4" src={pokemon.image_url}/>
                    <div className="flex flex-row">
                        <div className={`${styles["type-icon"]} ${styles[`${pokemon.type_1}`]}`}></div>
                        {pokemon.type_2 && 
                            <div className={`${styles["type-icon"]} ${styles[`${pokemon.type_2}`]}`}></div>
                        }
                    </div>
                </div>
            </div>
        )
      })}
    </div>
  );
};
