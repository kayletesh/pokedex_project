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
  document.querySelector("#pokemon-svg img").src =
    `${currentPokemon.sprites.other.dream_world.front_default}`;
}

function randomID(min, max) {
  const minID = Math.ceil(min);
  const maxID = Math.floor(max);
  return Math.floor(Math.random() * (maxID - minID) + minID);
}
const play = document.querySelector("#play-button");

async function buildPokemonElement(min, max) {
  const currentPokemon = await getPokemonData(randomID(min, max));
  displayPokemonSVG(currentPokemon);
  play.innerText = "PLAY AGAIN";
}

play.addEventListener("click", () => {
  const dropdown = document.querySelector("#gen-selector");
  const selectedGen = dropdown.value;
  if (selectedGen === "gen-one") {
    const genStart = 1;
    const genEnd = 151;
    buildPokemonElement(genStart, genEnd);
  } else if (selectedGen === "gen-two") {
    const genStart = 152;
    const genEnd = 252;
    buildPokemonElement(genStart, genEnd);
  } else if (selectedGen === "gen-all") {
    const genStart = 1;
    const genEnd = 252;
    buildPokemonElement(genStart, genEnd);
  }
});

// GEN ONE
// const genOne = getPokemonData(randomID(1, 151));
// GEN TWO
// const genTwo = getPokemonData(randomID(152, 252));

// create a function that creates an image
// based on the id pulled from getPokemonData,
// and displays it in div pokemon-svg
