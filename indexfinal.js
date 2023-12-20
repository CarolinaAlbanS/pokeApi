const main = document.querySelector("main");
const list = document.querySelector("ol");
const pagina = "https://pokeapi.co/api/v2/pokemon/?limit=151";
const types = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Steel",
  "Fairy",
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
    height: pokemon.height * 10,
    weight: pokemon.weight / 10,
    types: pokemon.types.map((type) => type.type.name).join(", "),
  }));
  console.log(mapearPokemon);
};

const pintarPokemon = (pokes) => {
  main.innerHTML = "";
  let conteiner = document.createElement("div");
  conteiner.classList.add("conteiner");
  for (const pokemon of pokes) {
    let figure = document.createElement("figure");
    let myDiv = document.createElement("div");
    let myDiv2 = document.createElement("div");
    figure.classList.add("figure");
    myDiv.classList.add("card");
    myDiv2.classList.add("cardies");
    myDiv.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.img}" alt="${pokemon.name}" >`;
    myDiv2.innerHTML = `
    <h3>Abilities:</h3> <p>${pokemon.abilty}</p>
    <h3>Experience:</h3> <p>${pokemon.experience}</p>
    <h3>Height:</h3> <p>${pokemon.height} cm</p>
    <h3>Weight:</h3> <p>${pokemon.weight} kg</p>
    <h3>Types:</h3> <p>${pokemon.types}</p>`;
    figure.appendChild(myDiv);
    figure.appendChild(myDiv2);
    conteiner.appendChild(figure);
  }
  main.appendChild(conteiner);
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

const filtrarTipos = (pokemons) => {
  let header = document.querySelector(".header");
  const divButton = document.createElement("div");
  header.appendChild(divButton);
  divButton.classList.add("divButton");
  for (let i = 0; i < types.length; i++) {
    const tipo = types[i];
    const buttonTypes = document.createElement("button");
    buttonTypes.classList.add("button");
    buttonTypes.textContent = tipo;
    divButton.appendChild(buttonTypes);
    buttonTypes.addEventListener("click", () => tiposFiltrado(pokemons, tipo));
  }
};
const tiposFiltrado = (pokemons, filtro) => {
  let tipos = pokemons.filter((pokemon) =>
    pokemon.types.toLowerCase().includes(filtro.toLowerCase())
  );
  pintarPokemon(tipos);
};

const pokedex = async () => {
  const myPokemon = await pokemons();
  cargado.classList.add("hidden");
  const pokemapeados = mapearPokemon(myPokemon);
  pintarPokemon(pokemapeados);
  cogerInput(pokemapeados);
  filtrarTipos(pokemapeados);
};
pokedex();
