import "./style.css";
const DOMSelectors = {
  form: document.querySelector(".userInput"),
  button: document.querySelector(".submitButton"),
};
const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
let guessed = [];
let pulled = [];
async function getData() {
  try {
    let usableAPI = pullPokemon();
    let response1 = await fetch(usableAPI[0]);
    let pulledPokemonInfo1 = await response1.json();
    let response2 = await fetch(usableAPI[1]);
    let pulledPokemonInfo2 = await response2.json();
    console.log(pulledPokemonInfo1);
    console.log(pulledPokemonInfo2);
  } catch (error) {}
}
//pull a random pokemon from api, have input bar for name of pokemon, only accept valid name of pokemon, add inputted pokemon to an array, make sure user doesn't repeat their guesses, have a separate list to make sure the same pokemon isnt pulled, when user inputs a guess compare the categories of the guess with the pulled pokemon using api data, show a vicotry screen if user gets it right, show a defeat screen if they dont get it in 6 guesses
function pullPokemon() {
  let randomNumber = Math.floor(Math.random() * (1025 + 1));
  console.log(randomNumber);
  let linkList = [
    `https://pokeapi.co/api/v2/pokemon-species/${randomNumber}`,
    `https://pokeapi.co/api/v2/pokemon/${randomNumber}`,
  ];
  return linkList;
}
function validGuess() {
  DOMSelectors.form.addEventListener("submit", function (event) {
    event.preventDefault();}
  let input = 
}
function hintGenerator(info1, info2) {}
getData();
// blue is #3468a7
//yellow is #fbcb0f
