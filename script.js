const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

//make an ajax call and fetch data
let DATA_ARRAY = [];
fetch(endpoint, { method: "GET" })
  .then((response) => response.json())
  .then((data) =>
    data.forEach((element) => {
      DATA_ARRAY.push(element);
    })
  )
  .catch((error) => console.error(error));

const form = document.querySelector(".search-form");
const input = document.querySelector(".search");
const ulElement = document.querySelector(".suggestions");
form.addEventListener("input", (e) => {
  let userInput = e.target.value;
  const lowerUserInput = userInput.toLowerCase();

  ulElement.innerHTML = "";

  DATA_ARRAY.forEach((element) => {
    if (
      element.city.toLowerCase().includes(lowerUserInput) ||
      element.state.toLowerCase().includes(lowerUserInput)
    ) {
      const liElement = document.createElement("li");
      const startIndexCity = element.city.toLowerCase().indexOf(lowerUserInput);
      const endIndexCity = startIndexCity + lowerUserInput.length - 1;
      let string1City = element.city.substring(0, startIndexCity - 1);
      if (element.city[startIndexCity - 1] === " ") {
        string1City = element.city.substring(0, startIndexCity - 1) + " ";
      }
      const string2City = element.city.substring(
        startIndexCity,
        endIndexCity + 1
      );
      const string3City = element.city.substring(endIndexCity + 1);

      const city = `${string1City}<span class="hl">${string2City}</span>${string3City}`;

      const startIndexState = element.state
        .toLowerCase()
        .indexOf(lowerUserInput);
      const endIndexState = startIndexState + lowerUserInput.length - 1;
      let string1State = element.state.substring(0, startIndexState - 1);
      if (element.state[startIndexCity - 1] === " ") {
        string1State = element.state.substring(0, startIndexState - 1) + " ";
      }
      const string2State = element.state.substring(
        startIndexState,
        endIndexState + 1
      );
      const string3State = element.state.substring(endIndexState + 1);

      const state = `${string1State}<span class="hl">${string2State}</span>${string3State}`;

      if (element.city.toLowerCase().includes(lowerUserInput)) {
        liElement.innerHTML = `<div>${city}, ${element.state}</div> <span class="population">${element.population}</span>`;
      } else if (element.state.toLowerCase().includes(lowerUserInput)) {
        liElement.innerHTML = `<div>${element.city}, ${state}</div> <span class="population">${element.population}</span>`;
      }
      ulElement.append(liElement);
    }
  });
});

//get data into an array
//add an input event on the form and get user input
//loop over data and print out all elements that matches the user input
