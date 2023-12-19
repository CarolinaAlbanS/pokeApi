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
  main.innerHTML = "";
  for (const pokemon of pokes) {
    let myDiv = document.createElement("div");
    myDiv.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.img}" alt="${pokemon.name}" >
    <h3>Abilities</h3>
    <p>${pokemon.abilty}</p>
    <h3>Experience</h3>
    <p>${pokemon.experience}</p>
    <h3>Height</h3>
    <p>${pokemon.height}</p>
    <h3>Weight</h3>
    <p>${pokemon.weight}</p>`;

    main.appendChild(myDiv);
  }
};
const cogerInput = (pokemons) => {
  const input = document.querySelector("input");
  input.addEventListener("input", () => filtrarPokemon(pokemons, input.value));
};
const filtrarPokemon = (arrayPoke, filtro) => {
  let filtroPoke = arrayPoke.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filtro.toLowerCase())
  );
  pintarPokemon(filtroPoke);
};

const pokedex = async () => {
  const myPokemon = await pokemons();
  const pokemapeados = mapearPokemon(myPokemon);
  pintarPokemon(pokemapeados);
  cogerInput(pokemapeados);
};
pokedex();
