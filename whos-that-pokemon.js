let currentPokemon;
async function getPokemonData(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

function displayPokemonSVG(currentPokemon) {
  const pokeSVG = currentPokemon.sprites.other.dream_world.front_default;

  if (pokeSVG) {
    document.querySelector("#pokemon-svg").src = pokeSVG;
  } else {
    document.querySelector("#pokemon-svg").src =
      currentPokemon.sprites.front_default;
  }
}

function randomID(min, max) {
  const minID = Math.ceil(min);
  const maxID = Math.floor(max);
  return Math.floor(Math.random() * (maxID - minID) + minID);
}
const play = document.querySelector("#play-button");

async function buildPokemonElement(min, max) {
  currentPokemon = await getPokemonData(randomID(min, max));
  displayPokemonSVG(currentPokemon);
  play.disabled = false;
  play.innerText = "PLAY AGAIN";
}

const pokemonGens = {
  "gen-all": [1, 1025],
  "gen-one": [1, 151],
  "gen-two": [152, 251],
  "gen-three": [252, 386],
  "gen-four": [387, 493],
  "gen-five": [494, 649],
  "gen-six": [650, 721],
  "gen-seven": [722, 809],
  "gen-eight": [810, 905],
  "gen-nine": [906, 1025],
};

play.addEventListener("click", () => {
  play.disabled = true;
  const dropdown = document.querySelector("#gen-selector");
  const selectedGen = dropdown.value;
  //   let selectedGenRange;
  buildPokemonElement(pokemonGens[selectedGen][0], pokemonGens[selectedGen][1]);
});

// combo-box get data

async function getPokemonName() {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=1025`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const data = await res.json();
    populateComboBox(data.results);
  } catch (error) {
    console.error(error.message);
  }
}

getPokemonName();

function populateComboBox(pokemonArray) {
  const datalist = document.querySelector("#pokemon-list");
  pokemonArray.forEach((pokemon) => {
    const option = document.createElement("option");
    option.setAttribute("value", pokemon.name);
    datalist.appendChild(option);
  });
}
// Check if input selection matches the name of pokemon selected by buildPokemonElement
const submit = document.querySelector("#greatball-submit-btn");

submit.addEventListener("click", () => {
  const playerInput = document.querySelector("#pokemon-choice").value;
  if (playerInput === currentPokemon.name) {
    console.log("correct");
  } else {
    console.log("Try Again");
  }
});

// add alt text when image is displayed. not with the overlay
