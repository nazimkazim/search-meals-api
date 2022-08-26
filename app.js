// https://www.themealdb.com/api.php
// https://restcountries.com/#api-endpoints-v2-name
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const recipesList = document.querySelector(".recipes-list");
const modal = document.querySelector(".modal");

searchBtn.addEventListener("click", getRecipes);

const getData = ({ meals }) => {
  recipesList.innerHTML = "";
  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];

    recipesList.innerHTML += `<div class=recipe-box>
        <img src='${meal.strMealThumb}' />
        <p>${meal.strMeal.slice(0, 10)}...</p>
        <button onclick="openModal('${
          meal.idMeal
        }')" class=view-btn>view</button>
     </div>`;
  }
};

function getOnlyIngredients(meal) {
  const arrFromObj = Object.entries(meal)
  const allIngredients = arrFromObj.filter(([key, value]) => {
    return key.includes('strIngredient') && value !== ''
  })
  console.log(allIngredients);
}

async function openModal(id) {
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const { meals } = await data.json();
  const [meal] = meals;
  modal.style.display = "flex";
  getOnlyIngredients(meal)
  modal.innerHTML = `
        <div class=modal-container>
        <button onclick="closeModal()" class=close-btn><i class="fa fa-times" aria-hidden="true"></i>
        </button>
            <img src=${meal.strMealThumb} />
        </div>`;
}

function closeModal() {
  modal.style.display = "none";
}
/* 
fetch('https://restcountries.com/v2/name/american')
.then(response => response.json()).then(data => console.log(data)) */

function getRecipes() {
  const recipeName = searchInput.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
    .then((response) => response.json())
    .then((data) => getData(data));
  searchInput.value = "";
}
