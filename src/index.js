import './css/styles.css';
import { fetchCountries } from "./js/fetchCountries.js";
const _ = require('lodash');
import Notiflix from 'notiflix';
// import 'flatpickr/dist/flatpickr.min.css';
const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

let width = "30px"
input.style.borderWidth = "5px";
input.style.maxWidth = "500px";
input.style.minWidth = "300px";
input.style.fontSize = "25px";
input.addEventListener("focus", (event) => {
    event.target.style.borderColor = "lightblue";
});

countryList.style.listStyle = "none";
countryList.style.fontSize = "20px";
countryList.style.lineHeight = "3";
countryList.style.verticalAlign = "middle";

input.addEventListener("input", _.debounce(function general(event) {
  if (event.target.value.trim() === "") {
    clearInput();
  } else {
    fetchCountries(event.target.value.trim())
      .then(arrayOfCountries =>
        renderArrayOfCountries(arrayOfCountries))
      .catch(function catchError(error) {
        Notiflix.Notify.failure("Oops, there is no country with that name");
        let markup = "";
        countryList.innerHTML = markup;
      });
  }
},
  DEBOUNCE_DELAY,
  {
    leading: false,
    trailing: true,
  }
)
);

function renderArrayOfCountries(arrayOfCountries) {
  let numberOfCountries = arrayOfCountries.length;
  console.log(numberOfCountries);
  if (numberOfCountries>10) {
    moreThan10(arrayOfCountries)
  };
  if (numberOfCountries<11 && numberOfCountries > 1) {
    showCountries(arrayOfCountries);
  };
  if (numberOfCountries === 1) {
      width = "50px";
    show1Country(arrayOfCountries);
  };  
};

function moreThan10(arrayOfCountries) {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    let markup = "";
  countryList.innerHTML = markup;
  countryInfo.innerHTML = markup;
}

function showCountries(arrayOfCountries) {
    show(arrayOfCountries);
}

function show1Country(arrayOfCountries) {
    show(arrayOfCountries);
    showCountryInfo(arrayOfCountries);
}

function show(arrayOfCountries) {
  const markup = arrayOfCountries
    .map((country) => {
      return `<li>
      <img src=${country.flags.svg} alt=${country.name.common} width="${width}">
      <b>${country.name.common}</b>
    </li>`;
    })
    .join("");
  countryList.innerHTML = markup;
  countryInfo.innerHTML = "";
  countryList.style.fontSize = "20px";
    width = "30px";
};

function showCountryInfo(arrayOfCountries) {
  const markup = arrayOfCountries
              .map((country) => {
                let languages = Object.values(country.languages);
          return `
          <p>Capital: ${country.capital}</p>
          <p>Population: ${country.population}</p>
          <p>Languages: ${languages}</p>
        `;
        })
        .join("");
  countryInfo.innerHTML = markup;
  countryList.style.fontSize = "30px";
  
}


function clearInput() {
    Notiflix.Notify.info("please enter a country name");
    let markup = "";
    countryList.innerHTML = markup;
    countryInfo.innerHTML = markup;
};
