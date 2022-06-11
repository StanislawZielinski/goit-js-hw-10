import './css/styles.css';
import { fetchCountries } from "./js/fetchCountries.js";
const _= require('lodash');
const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");


input.style.borderWidth = "5px";
input.style.maxWidth = "500px";
input.style.minWidth = "300px";
input.style.fontSize = "25px";
input.addEventListener("focus", (event) => {
    event.target.style.borderColor = "lightblue";
});


input.addEventListener("input",_.debounce((event) => {
    fetchCountries(event.target.value.trim()).then((arrayOfCountries) =>
        renderArrayOfCountries(arrayOfCountries))},
    DEBOUNCE_DELAY,
    {
        leading: false,
        trailing: true,
    }));


// fetchCountries().then((arrayOfCountries) => console.log(arrayOfCountries));
// fetchCountries().then((arrayOfCountries) => renderArrayOfCountries(arrayOfCountries));

function renderArrayOfCountries(arrayOfCountries) {
      const markup = arrayOfCountries
    .map((country) => {
      return `<li>
          <p>${country.name.common}</p>
        </li>`;
    })
    .join("");
  countryList.innerHTML = markup;
}