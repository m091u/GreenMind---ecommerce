import { useEffect, useState } from "react";


function Search ({filterSearchHandler}) {
    const [char, setChar] = useState("");

    const handleSearch = (event) => {
        setChar(event.target.value);
        filterSearchHandler(event.target.value);
    };

    return(
        <>
        <input value={char} type="text" onChange={handleSearch} placeholder="&#128269;  Search for plants" className="search-bar"/>
        </>
    )
}

export default Search;