const main = document.querySelector("main");
const list = document.querySelector("ol");
const pagina = "https://pokeapi.co/api/v2/pokemon/?limit=151";
const types = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fichting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
  "stellar",
];

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
    abilty: pokemon.abilities.map((abil) => abil.ability.name).join(", "),
    experience: pokemon["base_experience"],
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map((type) => type.type.name).join(", "),
  }));
  console.log(mapearPokemon);
};

const pintarPokemon = (pokes) => {
  main.innerHTML = "";
  for (const pokemon of pokes) {
    let myDiv = document.createElement("div");
    myDiv.classList.add("card");
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
    <p>${pokemon.weight}</p>
    <h3>Types</h3>
    <p>${pokemon.types}</p>`;

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

const filtrarFuego = (pokemons) => {
  let header = document.querySelector(".header");
  const buttonFuego = document.createElement("button");
  buttonFuego.textContent = "Fire";
  header.appendChild(buttonFuego);
  buttonFuego.addEventListener("click", () => fuegoFiltrado(pokemons, "Fire"));
};
const fuegoFiltrado = (arrayFuego, filtro) => {
  let fuegof = arrayFuego.filter((pokemon) =>
    pokemon.types.toLowerCase().includes(filtro.toLowerCase())
  );
  pintarPokemon(fuegof);
};

const pokedex = async () => {
  const myPokemon = await pokemons();
  const pokemapeados = mapearPokemon(myPokemon);
  pintarPokemon(pokemapeados);
  cogerInput(pokemapeados);
  filtrarFuego(pokemapeados);
};
pokedex();
