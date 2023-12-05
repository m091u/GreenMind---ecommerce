import { useEffect, useState } from "react";


function Search ({filterSearchHandler}) {
    const [char, setChar] = useState("");

    const handleSearch = (event) => {
        setChar(event.target.value);
        filterSearchHandler(event.target.value);
    };

    return(
        <>
        <input value={char} type="text" onChange={handleSearch} placeholder="Search for products here    &#128269;" className="search-bar"/>
        </>
    )
}

export default Search;