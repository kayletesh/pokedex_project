let currentPokemon;
let dropdown;
let selectedGen;
let playerScore = 0;
const submit = document.querySelector("#greatball-submit-btn");
const correctAnswer = document.querySelector("#correct-pokemon");
const scoreCard = document.querySelector("#player-score");
const play = document.querySelector("#play-button");

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
  const pokemonImgSrc =
    currentPokemon.sprites.other.dream_world.front_default ||
    currentPokemon.sprites.front_default;
  const preloadImg = new Image();
  preloadImg.addEventListener("load", () => {
    pokemonFilter.classList.add("black-overlay");

    document.querySelector("#pokemon-svg").src = pokemonImgSrc;
  });
  preloadImg.src = pokemonImgSrc;
  correctAnswer.classList.add("hidden");
}
function randomID(min, max) {
  const minID = Math.ceil(min);
  const maxID = Math.floor(max);
  return Math.floor(Math.random() * (maxID - minID) + minID);
}
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
  scoreCard.innerHTML = `${playerScore}`;
  correctAnswer.classList.remove("hidden");
  correctAnswer.innerText = "Loading...";
  buildPokemonElement(pokemonGens[selectedGen][0], pokemonGens[selectedGen][1]);
  if (play.innerText === "Restart") {
    window.location.reload();
    play.innerText = "play";
  }
  play.innerText = "Restart";
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

const pokemonFilter = document.querySelector("#pokemon-svg");

// add alt text when image is displayed. not with the overlay

const cryBtn = document.querySelector("#btn-cry");
cryBtn.addEventListener("click", () => {
  const cry = new Audio(currentPokemon.cries.latest);
  console.log(cry);
  cry.addEventListener("canplaythrough", () => {
    cry.play();
  });
});
function capitalizeFirstLetter(string) {
  const capitalString =
    string[0].toUpperCase() +
    string.split("").splice(1, string.length).join("");
  return capitalString;
}

const handleRoundEnd = () => {
  pokemonFilter.classList.remove("black-overlay");
  correctAnswer.classList.remove("hidden");
  correctAnswer.innerText = `IT'S ${currentPokemon.name.toUpperCase()}!`;
  skipNextBtn.innerText = "Next";
  submit.disabled = true;
  // typeBtn.classList.replace;
};
const skipNextBtn = document.querySelector("#wtp__skip-btn");
skipNextBtn.addEventListener("click", () => {
  if (skipNextBtn.innerText === "Skip") {
    handleSkip();
  } else if (skipNextBtn.innerText === "Next") {
    handleNextRound();
  }
});
function handleSkip() {
  if (confirm("Are you sure you wish to skip?")) {
    handleRoundEnd();
    scoreCard.innerText = 0;
  }
}
function handleNextRound() {
  correctAnswer.classList.remove("hidden");
  correctAnswer.innerText = "Loading...";
  buildPokemonElement(pokemonGens[selectedGen][0], pokemonGens[selectedGen][1]);
  typeBtn.innerText = "Pokemon type";
  skipNextBtn.innerText = "Skip";
  submit.disabled = false;
}

const submitForm = (e) => {
  e.preventDefault();
  const guess = e.target[0].value;
  const roundWon = guess === currentPokemon.name;
  if (roundWon) {
    handleRoundEnd();
    playerScore = playerScore + 3;
    scoreCard.innerHTML = playerScore;
  } else {
    correctAnswer.classList.remove("hidden");
    correctAnswer.innerText = `Try again!`;
  }
};

const typeBtn = document.querySelector("#type-hint-btn");
typeBtn.addEventListener("click", handlePokemonTypeHint);
function handlePokemonTypeHint() {
  const pokemonTypes = currentPokemon.types;
  if (pokemonTypes.length === 1) {
    capitalizeFirstLetter(pokemonTypes[0].type.name);
    typeBtn.innerHTML = capitalizeFirstLetter(pokemonTypes[0].type.name);
  } else if (pokemonTypes.length === 2) {
    typeBtn.innerHTML = `${capitalizeFirstLetter(pokemonTypes[0].type.name)} | ${capitalizeFirstLetter(pokemonTypes[1].type.name)}`;
  }
  typeBtn.style = `  background: linear-gradient(
   -45deg,yellow 50%, blue 50%
  ); 
  `;
  //   -webkit-text-stroke: 2px black;
  //   font-size: 2rem;
  //   color: var(--primary);
}
//     typeBtn.style = "background-color: var(--ice)";
//     // border: 5px solid;
//     // border-color: blue blue green green;
//   // change color to match the color of each type by adding a classname that pulls the variable color
//     // make the border show both colors, not the background.
