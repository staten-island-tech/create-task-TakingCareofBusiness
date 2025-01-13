import "./style.css";
const DOMSelectors = {
  form: document.querySelector(".userInput"),
  button: document.querySelector(".submitButton"),
  textBar: document.querySelector(".inputForm"),
  errorText: document.querySelector(".errorText"),
  endContainer: document.querySelector(".endContainer"),
  hint1: document.querySelector(".hint1"),
  hint2: document.querySelector(".hint2"),
  hint3: document.querySelector(".hint3"),
  hint4: document.querySelector(".hint4"),
  hint5: document.querySelector(".hint5"),
};
const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
let guessed = [];
let pulled = [];
let gameEnd = false;
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
    validGuess(allNames, pulledPokemonInfo1, pulledPokemonInfo2);
  } catch (error) {}
}
//pull a random pokemon from api, have input bar for name of pokemon, only accept valid name of pokemon, add inputted pokemon to an array, make sure user doesn't repeat their guesses, have a separate list to make sure the same pokemon isnt pulled, when user inputs a guess compare the categories of the guess with the pulled pokemon using api data, show a victory screen if user gets it right, show a defeat screen if they dont get it in 6 guesses
function pullPokemon() {
  let newNumber = false;
  while (newNumber === false) {
    let randomNumber = Math.floor(Math.random() * (1025 + 1));
    if (!pulled.includes(randomNumber)) {
      pulled.push(randomNumber);
      let linkList = [
        `https://pokeapi.co/api/v2/pokemon-species/${randomNumber}`,
        `https://pokeapi.co/api/v2/pokemon/${randomNumber}`,
      ];
      return linkList;
    }
  }
}
function validGuess(allNames, info1, info2) {
  console.log(info1.name);
  gameEnd = false;
  DOMSelectors.button.addEventListener("click", function (event) {
    event.preventDefault();
    let pokemonStatus = false;
    let inputted = DOMSelectors.textBar.value;
    let input = inputted.toLowerCase();
    allNames.forEach((title) => {
      if (input === title.name) {
        pokemonStatus = true;
      }
    });
    if (!pokemonStatus || guessed.includes(input)) {
      DOMSelectors.textBar.value = "";
      if (errorMessage === 0) {
        DOMSelectors.errorText.insertAdjacentHTML(
          "afterend",
          "<p class='error'>Please input a real Pokemon name</p>"
        );
        errorMessage = 1;
      }
    }
    if (pokemonStatus && !guessed.includes(input) && !(input === info1.name)) {
      DOMSelectors.textBar.value = "";
      if (errorMessage != 0) {
        let errors = document.querySelector(".error");
        errors.remove();
        errorMessage = 0;
      }
      guessed.push(input);
      if (!(guessed.length === 0)) {
        hintGenerator(info1, info2);
      }
    }
    if (input === info1.name) {
      DOMSelectors.textBar.value = "";
      DOMSelectors.endContainer.insertAdjacentHTML(
        "afterend",
        "<p class='endMessage'>Congratulations! You guessed the Pokemon!</p>"
      );
      gameEnd = true;
    }
  });
}
function hintGenerator(info1, info2) {
  if (guessed.length === 1) {
    DOMSelectors.hint1.insertAdjacentHTML(
      "beforeend",
      `<p class='hint'>This pokemon is from ${info1.generation.name}</p>`
    );
  }
  if (guessed.length === 2) {
    let evolvesFrom;
    if (!info1.evolves_from_species) {
      evolvesFrom = "This pokemon does not evolve from another pokemon!";
    } else {
      evolvesFrom = `This pokemon evolves from a pokemon`;
    }
    DOMSelectors.hint2.insertAdjacentHTML(
      "beforeend",
      `<p class='hint'>${evolvesFrom}</p>`
    );
  }
  if (guessed.length === 3) {
    DOMSelectors.hint3.insertAdjacentHTML(
      "beforeend",
      `<p class='hint'>This pokemon is ${info1.color.name}</p>`
    );
  }
  if (guessed.length === 4) {
    let typeName;
    if (info2.types.length === 1) {
      typeName = `This pokemon's type is ${info2.types[0].type.name}`;
    }
    if (info2.types.length === 2) {
      typeName = `This pokemon's first type is ${info2.types[0].type.name} and their second type is ${info2.types[1].type.name}`;
    }
    DOMSelectors.hint4.insertAdjacentHTML(
      "beforeend",
      `<p class='hint'>${typeName}</p>`
    );
  }
  if (guessed.length === 5) {
    DOMSelectors.hint5.insertAdjacentHTML(
      "beforeend",
      `<p class='hint'>The first letter in this pokemon's name is ${info1.name.charAt(
        0
      )} </p>`
    );
  }
}
getData(URL);
// blue is #3468a7
//yellow is #fbcb0f
