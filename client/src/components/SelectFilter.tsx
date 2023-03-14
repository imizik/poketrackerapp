import React from "react";


type Props = {
    selectedFilter: string;
    setSelectedFilter: Function;
};

export const SelectFilter = (props: Props) => {
    const allTypes = [
        "Normal",
        "Fire",
        "Water",
        "Electric",
        "Grass",
        "Ice",
        "Fighting",
        "Poison",
        "Ground",
        "Flying",
        "Psychic",
        "Bug",
        "Rock",
        "Ghost",
        "Dragon",
        "Dark",
        "Steel",
        "Fairy"
    ];
    const handleSelectedFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setSelectedFilter(event.target.value);
    };
    return (
        <select
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="pokemon-list-select"
        value={props.selectedFilter}
        onChange={handleSelectedFilterChange}
        >
        <option value="">Any</option>
        {allTypes.map((type) => (
            <option key={type} value={type}>
            {type}
            </option>
        ))}
        </select>
    );
};
