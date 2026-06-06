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
    document.querySelector("#pokemon-svg img").src = pokeSVG;
  } else if (pokeSVG) {
    document.querySelector("#pokemon-svg img").src =
      currentPokemon.sprites.front_default;
    console.log("backup img");
  }
}

function randomID(min, max) {
  const minID = Math.ceil(min);
  const maxID = Math.floor(max);
  return Math.floor(Math.random() * (maxID - minID) + minID);
}
const play = document.querySelector("#play-button");

async function buildPokemonElement(min, max) {
  const currentPokemon = await getPokemonData(randomID(min, max));
  console.log(currentPokemon);
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

// if result has no image, rerun function until image found.

// set the svg to a variable
// check if it has a value
// if it doesnt, set a back up or just display an error message
