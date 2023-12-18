const main = document.querySelector("main");
const list = document.querySelector("ol");
const pagina = "https://pokeapi.co/api/v2/pokemon/?limit=151";

const pokemons = async () => {
  let response = await fetch(pagina);
  let resjson = await response.json();

  let poke = resjson.results;

  for (let i = 0; i < poke.length; i++) {
    const pokemon = poke[i];
    let url = pokemon.url;
    let response = await fetch(url);
    let myPokemon = await response.json();
    let myDiv = document.createElement("div");
    let titulo = document.createElement("h2");
    myDiv.appendChild(titulo);
    titulo.textContent = myPokemon.name;
    list.appendChild(myDiv);
    let imagen = myPokemon.sprites.other["official-artwork"]["front_default"];
    let img = document.createElement("img");
    img.src = imagen;
    myDiv.appendChild(img);
    console.log(imagen);
  }
};

pokemons();
