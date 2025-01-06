import "./style.css";
const URL = "https://pokeapi.co/api/v2/pokemon";
async function getData(URL) {
  try {
    const originalResponse = await fetch(URL);
    const pokemon = await originalResponse.json();
    let usableAPI = pullPokemon(pokemon);
    const response = await fetch(usableAPI);
    const pulledPokemon = await response.json();
  } catch (error) {}
}
//pull a random pokemon from api, have input bar for name of pokemon, only accept valid name of pokemon, add inputted pokemon to an array, make sure user doesn't repeat their guesses, have a separate list to make sure the same pokemon isnt pulled, when user inputs a guess compare the categories of the guess with the pulled pokemon using api data, show a vicotry screen if user gets it right, show a defeat screen if they dont get it in 6 guesses
function pullPokemon(pokemon) {
  let max = pokemon.count;
  let randomNumber = Math.floor(Math.random() * (max + 1));
  console.log(randomNumber);
  return (
    `https://pokeapi.co/api/v2/pokemon-species/${randomNumber}`,
    `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
  );
}
getData(URL);
// blue is #3468a7
//yellow is #fbcb0f
