const main = document.querySelector("main");
const list = document.querySelector("ol");
const pagina = "https://pokeapi.co/api/v2/pokemon/?limit=150";
// const logo = document.querySelector(".logo");

// logo.addEventListener("focus", logo);

const pokemons = async () => {
  let response = await fetch(pagina);
  let resjson = await response.json();

  let poke = resjson.results;

  for (let i = 0; i < poke.length; i++) {
    const pokemon = poke[i];
    let url = pokemon.url;
    let response = await fetch(url);
    let myPokemon = await response.json();
    console.log(myPokemon.name);
    let myDiv = document.createElement("div");
    let titulo = document.createElement("h2");
    myDiv.appendChild(titulo);
    titulo.textContent = myPokemon.name;
    document.body.appendChild(myDiv);
    // poke;
    // let imagen = pokemon["official-artwork"];
    // console.log(imagen);
  }
};

pokemons();
