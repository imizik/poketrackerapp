import React, { useState, useEffect } from "react";
import { PokeList } from "./PokeList";
import { SelectFilter } from "./SelectFilter";
import { pokemonData } from "./data/pokemon";

type Props = {};

export const PokemonListContainer = (props: Props) => {
  const [caughtList, setCaughtList] = useState({});
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter1, setSelectedFilter1] = useState("");
  const [selectedFilter2, setSelectedFilter2] = useState("");
  const [filteredPokemonList, setFilteredPokemonList] = useState(pokemonData);

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filteredList = pokemonData.filter((pokemon) => {
      const nameMatch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
      const dexNumberMatch = pokemon.dex_number.toString().includes(searchQuery);
      const type1Match = selectedFilter1 ? pokemon.type_1 === selectedFilter1.toLowerCase() : true;
      const type2Match = selectedFilter2 ? pokemon.type_2 === selectedFilter2.toLowerCase() : true;
      return (nameMatch || dexNumberMatch) && type1Match && type2Match;
    });
    setFilteredPokemonList(filteredList);
  }, [searchQuery, selectedFilter1, selectedFilter2]);

  return (
    <div>
      <div className="mb-4 flex">
        <div className="w-3/4 mr-10">
          <label
            className="block text-gray-700 w-full text-sm font-bold mb-2"
            htmlFor="pokemon-list-filter"
          >
            Filter By Name or PokeDex Number
          </label>
          <input
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pokemon-list-filter"
            type="text"
            placeholder="Enter name or PokeDex Number..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>
        <div className="mr-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pokemon-list-select"
          >
            Type 1
          </label>
          <SelectFilter selectedFilter={selectedFilter1} setSelectedFilter={setSelectedFilter1}/>
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pokemon-list-select"
          >
            Type 2
          </label>
          <SelectFilter selectedFilter={selectedFilter2} setSelectedFilter={setSelectedFilter2}/>
        </div>
      </div>
      <p>
        You have caught <strong>X</strong> out of <strong>{total}</strong>, or{" "}
        <strong>~X%</strong>
      </p>
      <PokeList setTotal={setTotal} total={total} pokemonList={filteredPokemonList} />
    </div>
  );
};
