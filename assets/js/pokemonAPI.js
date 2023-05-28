const pokeAPI ={}

pokeAPI.getPokemonDetail = (pokemon)=>{
    return fetch(pokemon.url)
            .then((response)=> response.json())
}

pokeAPI.getPokemons = (offset = 0, limit =5)=>{

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        .then((response) => {return response.json()})
        .then((jsonBody) => { return jsonBody.results})
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
        .then((detailsRequests)=> Promise.all(detailsRequests))
        .then((pokemonsDetails)=>  pokemonsDetails)
    .catch((error)=> console.error(error))
}