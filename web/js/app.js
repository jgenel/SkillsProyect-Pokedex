
    /*Setthing the div container that will have all the data*/
    const poke_container = document.getElementById('poke_container');
    
    /*listing 1st gen pokemon, it could be more*/
    const pokemons_number = 151;
    
    /*Here's the space where i can add different colours to the html but my time ran out*/
    
    const colors = {
      fire: '',
      grass: '',
      electric: '',
      water: '',
      ground: '',
      rock: '',
      fairy: '',
      poison: '',
      bug: '',
      dragon: '',
      psychic: '',
      flying: '',
      fighting: '',
      normal: ''
    };


    /*Setting the type of the future gradient colors*/
    const main_types = Object.keys(colors);
    const secondary_type = Object.keys(colors);
    //console.log(main_types);

    
    /*Fetching the API data*/
    const fetchPokemons = async ()=> {
      for(let i=1; i<=pokemons_number;i++){
        await getPokemon(i);
      }
    }

    /*Get the id of the pokemon so we can get all the data bellow*/
    const getPokemon = async id =>{
      const url=`https://pokeapi.co/api/v2/pokemon/${id}`;
      const res = await fetch(url);
      const pokemon = await res.json();
      //console.log(pokemon);
      createPokemon(pokemon);
    }

    
    fetchPokemons();
    
    /*Main function that create a div for any pokemon fetched*/
    function createPokemon(pokemon){
      const pokemonEl = document.createElement('div');
      pokemonEl.classList.add('pokemon');

      /*mapping both types of the pokemon*/
      const poke_types = pokemon.types.map(el => el.type.name);
      const type = main_types.find(type =>poke_types.indexOf(type)>-1);
      const type2 = secondary_type.find(type =>poke_types.indexOf(type)>0);

      const name = pokemon.name[0].toUpperCase()+pokemon.name.slice(1);
      const pokeInnterHTML = `
      <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
        </div>

        <div class="info">
        <span class="number">#${pokemon.id} | ${name}</span>
        <ul>
          <li class="pkmdetailstype">Type 1: ${type}</li>
          <li class="pkmdetailstype">Type 2: ${type2}</li>
        </ul>
        <details class="pkmdetails">
          <summary>
            <span class="icon">🔍</span>
          </summary>
          <ul>
            <li class="pkmdetails">Base Experience:</li>
            <li class="pkmdetails">${pokemon.base_experience}</li>
          </ul>
          <ul>
            <li class="pkmdetails">Ability: ${pokemon.abilities[0].ability.name}</li>
          </ul>
          <div class="divTable">
            <div class="divTableBody">
            <div class="divTableRow">
            <div class="divTableCell">&nbsp;HP</div>
            <div class="divTableCell">&nbsp;ATTACK</div>
            <div class="divTableCell">&nbsp;DEFENSE</div>
            <div class="divTableCell">&nbsp;SP. ATTACK</div>
            <div class="divTableCell">&nbsp;SP. DEFENSE</div>
            <div class="divTableCell">&nbsp;SPEED</div>
            </div>
            <div class="divTableRow">
              <div class="divTableCell">&nbsp;${pokemon.stats[0].base_stat}</div>
              <div class="divTableCell">&nbsp;${pokemon.stats[1].base_stat}</div>
              <div class="divTableCell">&nbsp;${pokemon.stats[2].base_stat}</div>
              <div class="divTableCell">&nbsp;${pokemon.stats[3].base_stat}</div>
              <div class="divTableCell">&nbsp;${pokemon.stats[4].base_stat}</div>
              <div class="divTableCell">&nbsp;${pokemon.stats[5].base_stat}</div>
            </div>
            </div>
            </div>
            <!-- DivTable.com -->
        </details>
        </div>
        
      `;

      pokemonEl.innerHTML = pokeInnterHTML;

      poke_container.appendChild(pokemonEl);
    }