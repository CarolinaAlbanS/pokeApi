const main = document.querySelector("main");
const list = document.querySelector("ol");
const pagina = "https://pokeapi.co/api/v2/pokemon/?limit=151";

const pokemons = async () => {
  let response = await fetch(pagina);
  let resjson = await response.json();

  let poke = resjson.results;
  let arrayFiltro = [];

  for (let i = 0; i < poke.length; i++) {
    const pokemon = poke[i];
    let url = pokemon.url;
    let response = await fetch(url);
    let myPokemon = await response.json();
    arrayFiltro.push(myPokemon);
  }
  return arrayFiltro;
};

const mapearPokemon = (pokesinmapear) => {
  return pokesinmapear.map((pokemon) => ({
    name: pokemon.name,
    img: pokemon.sprites.other["official-artwork"]["front_default"],
    abilty: pokemon.abilities.map((abil) => abil.ability.name),
    experience: pokemon["base_experience"],
    height: pokemon.height,
    weight: pokemon.weight,
  }));
};
const pintarPokemon = (pokes) => {
  for (const pokemon of pokes) {
    let myDiv = document.createElement("div");
    let h2 = document.createElement("h2");
    let img = document.createElement("img");
    let p = document.createElement("p");

    h2.textContent = pokemon.name;
    img.scr = pokemon.sprites.other["official-artwork"]["front_default"];
    //     img.setAttribute(
    //       "src",
    //       pokemon.sprites.other["official-artwork"]["front_default"]
    //     );
    //     img.setAttribute("alt", pokemon.name);

    myDiv.appendChild(p);
    myDiv.appendChild(img);
    myDiv.appendChild(h2);
    main.appendChild(myDiv);

    // myDiv.innerHTML = `
    // <h2>${pokem.name}</h2>
    // <img src="${
    //   pokem.sprites.other["official-artwork"]["front_default"]
    // }" alt="${pokem.name}" >
    // <h3>"Abilities"</h3>
    // <p>${pokem.abilities.map((abil) => abil.ability.name)}</p>
    // <h3>"Experience"</h3>
    // <p>${pokem["base_experience"]}</p>
    // <h3>"Height"</h3>
    // <p>${pokem.height}</p>
    // <h3>"Weight"</h3>
    // <p>${pokem.weight}</p>`;

    //     main.appendChild(myDiv);
  }
};

const pokedex = async () => {
  const myPokemon = await pokemons();
  const pokemapeados = mapearPokemon(myPokemon);
  pintarPokemon(pokemapeados);
};
pokedex();
