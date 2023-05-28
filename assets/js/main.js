const pokemons = document.querySelector('.pokemons')

const pokemonList = document.querySelector('#pokemonList')

const loadMoreButton = document.querySelector('#loadMoreButton')

const modal = document.querySelector('#myModal');

const modalBody = document.querySelector('#modal-body');

const limit = 12
let offset = 0
const maxLimit = 151

function convertPokemonDetailToPokemon(pokemonDetail){
        const pokemon  = new Pokemon();
        pokemon.number = pokemonDetail.order
        pokemon.name   = pokemonDetail.name
        pokemon.id     = pokemonDetail.id

        pokemon.base_experience = pokemonDetail.base_experience
        
        const types  = pokemonDetail.types.map((typeSlot)=>typeSlot.type.name)
        const [type] = types

        pokemon.types  = types
        pokemon.type   = type

        pokemon.photo  = pokemonDetail.sprites.other.dream_world.front_default

        pokemon.abilities = pokemonDetail.abilities
        pokemon.stats = pokemonDetail.stats

        pokemon.height = Number(pokemonDetail.height)/10
        pokemon.weight = Number(pokemonDetail.weight)/10

        return pokemon
}

function convertPokemonTypesToLi(pokemonTypes){
    return pokemonTypes.map(
        (type)=>`<li class='type ${type}'>${type} </li>`).join('')  
}

function convertPokemonToLi(pokemon){
    const pokestring = JSON.stringify(pokemon.invencao)
    return `
    <li id=${pokemon.name} class="pokemon ${pokemon.type}" onclick="showModal(${esc_attr(JSON.stringify(pokemon))})">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
            <ol class="types">
                ${convertPokemonTypesToLi(pokemon.types)}
            </ol>
            <img src="${pokemon.photo}"
             alt="${pokemon.name}">
        </div>
    
    </li>`
}

function loadPokemonItens(offset,limit){
    pokeAPI.getPokemons(offset,limit)
    .then((pokemonList)=>{
        const newList = pokemonList.map((pokemon)=>{
        const pokemonDetail = convertPokemonDetailToPokemon(pokemon)
        return convertPokemonToLi(pokemonDetail)
    })
    
    pokemons.innerHTML += newList.join('')
    })
}

loadMoreButton.addEventListener('click',()=>{
    offset += limit
    
    if(offset+limit <= maxLimit)
        loadPokemonItens(offset,limit)
    
    else {
        const diference = maxLimit-offset
        loadPokemonItens(offset, diference)
        alert('chegamos ao fim da primeira temporada')
    }
    
})

function showModal(pokemon){


    modalBody.innerHTML = `
        <div class="modal-header ${pokemon.type}">
            <img src="${pokemon.photo}">
            <h1> ${pokemon.name} </h1>
        </div>
        <div class="modal-description" style="background:url(${pokemon.photo} cover">
            <h1>Status base</h1>
             <p> Experiencia base : ${pokemon.base_experience} </p>
             <p> Altura : ${pokemon.height} m</p>
             <p> Peso : ${pokemon.weight} Kgs</p>
    
            <p>${pokemon.stats[0].stat.name} : ${pokemon.stats[0].base_stat}</p>
            <p>${pokemon.stats[1].stat.name} : ${pokemon.stats[1].base_stat}</p>
            <p>${pokemon.stats[2].stat.name} : ${pokemon.stats[2].base_stat}</p>
            <p>${pokemon.stats[3].stat.name} : ${pokemon.stats[3].base_stat}</p>
            <p>${pokemon.stats[4].stat.name} : ${pokemon.stats[4].base_stat}</p>
            <p>${pokemon.stats[5].stat.name} : ${pokemon.stats[5].base_stat}</p>
              
    `
    
    // modalBody.innerHTML += "<p>saudacao</p>"
    modalBody.innerHTML += "</div>"


    modal.style.display = "block";
    // })

    //modalBody.innerHTML = this //this.id
}

// Quando eu clico fora do modal, ele eh 'fechado'
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } 

loadPokemonItens(offset,limit)


//essa funcao eh usada para poder passar um ojeto como parametro do evento onclick
function esc_attr(string) {
    if (!string) {
      return "";
    }
    return ("" + string).replace(/[&<>"'\/\\]/g, function(s) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#47;',
        "\\": '&#92;'
      }[s];
    });
  }