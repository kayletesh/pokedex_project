async function getPokemonData(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const result = await res.json();
    console.log(result.name);
  } catch (error) {
    console.error(error.message);
  }
}

function randomID(min, max) {
  const minID = Math.ceil(min);
  const maxID = Math.floor(max);

  return Math.floor(Math.random() * (maxID - minID) + minID);
}

// GEN ONE
// getPokemonData(randomID(1, 151));

// GEN TWO
// getPokemonData(randomID(152, 252));
