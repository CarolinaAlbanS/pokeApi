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
    // creo la ruta a la imagen ya la añado a myDiv
    let imagen = myPokemon.sprites.other["official-artwork"]["front_default"];
    let img = document.createElement("img");
    img.src = imagen;
    myDiv.appendChild(img);
    //creo un contenido para todo el texto que voy a añadir
    let contenido = document.createElement("div");
    myDiv.appendChild(contenido);
    //creo mi primer titulo de habilidades y adjunt las habialidades que he mapeado
    let titul = document.createElement("h3");
    titul.textContent = "Abilities";
    contenido.appendChild(titul);
    let ability = myPokemon.abilities.map((abil) => abil.ability.name);
    let parrafo = document.createElement("p");
    parrafo.textContent = ability;
    contenido.appendChild(parrafo);
    //creo mi segundo titulo con la experiencia que he encontrado buceando
    let titul2 = document.createElement("h3");
    titul2.textContent = "Experience";
    contenido.appendChild(titul2);
    let expe = myPokemon["base_experience"];
    let parrafo2 = document.createElement("p");
    parrafo2.textContent = expe;
    contenido.appendChild(parrafo2);
    //creo mi 3 titulo con la experiencia que he encontrado buceando
    let titul3 = document.createElement("h3");
    titul3.textContent = "Height";
    contenido.appendChild(titul3);
    let altura = myPokemon.height * 10;
    let parrafo3 = document.createElement("p");
    parrafo3.textContent = altura + " cm";
    contenido.appendChild(parrafo3);
    //creo mi 4 titulo con la experiencia que he encontrado buceando
    let titul4 = document.createElement("h3");
    titul4.textContent = "Weight";
    contenido.appendChild(titul4);
    let peso = myPokemon.weight;
    let parrafo4 = document.createElement("p");
    parrafo4.textContent = peso;
    contenido.appendChild(parrafo4);
  }
};

pokemons();
