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
    let resjson = await response.json();
    console.log(resjson);

    // let parrafo = document.createElement("p");
    // parrafo.textContent = pokemon.name;
    // document.body.appendChild(parrafo);
    // poke;
    // let imagen = pokemon["official-artwork"];
    // console.log(imagen);
  }
};

pokemons();
