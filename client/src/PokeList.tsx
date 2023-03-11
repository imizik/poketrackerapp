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

type CaughtList = {
    [key: number]: boolean;
}

type Props = {
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    pokemonList: Pokemon[];
    caughtList: CaughtList;
    setCaughtList: React.Dispatch<React.SetStateAction<CaughtList>>;
};

export const PokeList = (props: Props) => {

  const handlePokeBallClick = (dex_number: number) => {
    props.setCaughtList((prevCaughtList) => {
      const updatedList = { ...prevCaughtList };
      if (updatedList[dex_number]) {
        delete updatedList[dex_number];
      } else {
        updatedList[dex_number] = true;
      }
      return updatedList;
    });
  };

  return (
    <div className="mt-4 w-9/12 grid gap-6 grid-cols-3">
      {props.pokemonList.map((pokemon) => {
        const isCaught = props.caughtList[pokemon.dex_number] ? true : false;
        return (
          <div className={`items-center rounded-lg flex flex-row justify-around ${isCaught ? "bg-green-500" : "bg-white"}`}>
            <div onClick={() => handlePokeBallClick(pokemon.dex_number)}>
              <PokeBallIcon isCaught={isCaught}/>
            </div>
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
