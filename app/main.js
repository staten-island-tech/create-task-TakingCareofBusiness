import "./style.css";
const DOMSelectors = {
  form: document.querySelector(".userInput"),
  button: document.querySelector(".submitButton"),
  textBar: document.querySelector(".inputForm"),
  errorText: document.querySelector(".errorText"),
};
const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
let guessed = [];
let pulled = [];
let errorMessage = 0;
async function getData(URL) {
  try {
    let usableAPI = pullPokemon();
    let response1 = await fetch(usableAPI[0]);
    let pulledPokemonInfo1 = await response1.json();
    let response2 = await fetch(usableAPI[1]);
    let pulledPokemonInfo2 = await response2.json();
    let responseFull = await fetch(URL);
    let allPokemon = await responseFull.json();
    let allNames = Object.values(allPokemon.results);
    validGuess(allNames);
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
function validGuess(allNames) {
  DOMSelectors.button.addEventListener("click", function (event) {
    event.preventDefault();
    let pokemonStatus = false;
    let inputted = DOMSelectors.textBar.value;
    console.log(inputted);
    let input = inputted.toLowerCase();
    allNames.forEach((title) => {
      if (input === title.name) {
        pokemonStatus = true;
      }
    });
    if (!pokemonStatus) {
      DOMSelectors.textBar.value = "";
      if (errorMessage === 0) {
        DOMSelectors.errorText.insertAdjacentHTML(
          "afterend",
          "<p class='error'>Please input a real Pokemon name</p>"
        );
        errorMessage = 1;
      }
    }
    if (pokemonStatus) {
      DOMSelectors.textBar.value = "";
      if (errorMessage != 0) {
        let errors = document.querySelector(".error");
        errors.remove();
        errorMessage = 0;
      }
      guessed.push(input);
    }
  });
}
function hintGenerator(info1, info2) {}
getData(URL);
// blue is #3468a7
//yellow is #fbcb0f
