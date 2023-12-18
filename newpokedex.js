const main$$ = document.querySelector("main");
const list$$ = document.querySelector("ol");
const pagina$$ = "https://pokeapi.co/api/v2/pokemon/?limit=150";

for (let i = 0; i <= 150; i++) {
  const pagine = [i];
  console.log(pagine);
  const pokemons = async () => {
    let response = await fetch(pagina$$);
    let resjson = await response.json();
    return resjson;
  };
  pokemons();
}

//  bnecesito decirle que me imprima las 150 no que recorra algo

//   const peticion = async () => {
//     let respuesta = await fetch(pagina$$);
//     let respuJson = await respuesta.json();
//     console.log(respuJson);
//   };
//   peticion();
// }

// const mapsPokemon = () => {
//     const mapsMyPokemon =

// }

// const init = async () => {
//   const myPokemon$$ = await pokemons();
//   let poke = myPokemon$$.results;
//   console.log(poke);
//   for (let i = 0; i < poke.length; i++) {
//     const pokemon = poke[i];
//     // console.log(pokemon);
//     let myDiv$$ = document.createElement("div");
//     myDiv$$.textContent = pokemon.name;
//     document.body.appendChild(myDiv$$);
//     poke;
//   }

//   //   const mapearPokemon = mapsPokemon ()
// };
// init();
