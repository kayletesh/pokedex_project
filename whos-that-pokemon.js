let currentPokemon;
let dropdown;
let selectedGen;
let skip;
const submit = document.querySelector("#greatball-submit-btn");
const pokemonFilter = document.querySelector("#pokemon-svg");
const correctAnswer = document.querySelector("#correct-pokemon");

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

function skipNextToggle() {
  skip = document.querySelector("#wtp__skip-btn");
  console.log(typeof skip);
  skip.addEventListener("click", () => {
    if (skip.innerText === "Skip") {
      skip.innerText = "Next";
      correctAnswer.classList.remove("hidden");
      correctAnswer.innerText = ` IT'S ${currentPokemon.name.toUpperCase()}`;
      pokemonFilter.classList.remove("black-overlay");
      console.log("skip");
    } else if (skip.innerText === "Next") {
      skip.innerText = "skip";
      console.log("next");
      buildPokemonElement(
        pokemonGens[selectedGen][0],
        pokemonGens[selectedGen][1],
      );
      pokemonFilter.classList.add("black-overlay");
      correctAnswer.classList.add("hidden");
      // comboBox.value = "";
      skip.innerText = "Skip";
    }
  });
}
const play = document.querySelector("#play-button");

async function buildPokemonElement(min, max) {
  currentPokemon = await getPokemonData(randomID(min, max));
  displayPokemonSVG(currentPokemon);
  play.disabled = false;
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
  dropdown = document.querySelector("#gen-selector");
  selectedGen = dropdown.value;
  buildPokemonElement(pokemonGens[selectedGen][0], pokemonGens[selectedGen][1]);
  if (play.innerText === "restart") {
    window.location.reload();
    play.innerText = "play";
  }
  skipNextToggle();
  play.innerText = "restart";
});

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

submit.addEventListener("click", () => {
  const playerInput = document.querySelector("#pokemon-choice").value;

  const comboBox = document.querySelector("#pokemon-choice");

  if (playerInput === currentPokemon.name) {
    console.log("correct");
    comboBox.value = "";
    correctAnswer.classList.remove("hidden");
    pokemonFilter.classList.remove("black-overlay");
    skip.innerText = "Next";
    console.log(typeof pokemonFilter);
    correctAnswer.innerText = `It's ${currentPokemon.name.toUpperCase()}!`;
  } else {
    console.log("Try Again");
  }
});

// add alt text when image is displayed. not with the overlay
// is there a cleaner way to handle toggle skip/next

// // gameState = false(?)
// Textbox, submit, skip, hint should maybe be hidden before you play

// // gameState = playing
// PLAY turns into Restart

// SKIP -
// // Popup to agree to skip
// // If YES
// // // Remove Filter
// // // Show Pokemon Name
// // // SKIP = NEXT
// // // SUBMIT is disabled
// // If NO
// // // Do nothing i guess lol

// NEXT
// // Get new currentPokemon
// // Apply filter
// // clear combobox
// // NEXT = SKIP
