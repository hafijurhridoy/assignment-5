const getMealInput = () => {
  const mealInput = document.getElementById("input-meal").value;
  const ingredients = document.getElementById("meal-ingredients");
  ingredients.style.display = "none";

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const mealRecord = document.getElementById("meal-list");
      let mealsInput = data.meals;
      let mealList = "";
      mealsInput.forEach((element) => {
        mealList += ` 
            <div onClick="getIngredients('${element.strMeal}')" class="meal-card">
              <img class="card-img-top" src="${element.strMealThumb}" />
              <div class="card-body">
                <h5 class="card-title text-center">${element.strMeal}</h5>
              </div>
            </div>
            `;
      });
      mealRecord.innerHTML = mealList;
    })
    .catch(function () {
      const errorMessage = document.getElementById("meal-list");
      let mealErrorString = "";
      mealErrorString = `<h1 class="meal-error">404! We couldn't find the meal !</h1>`;
      errorMessage.innerHTML = mealErrorString;
    });
};

const getIngredients = (mealsItems) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealsItems}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals;
      mealItems(meal[0]);
    });
};

const mealItems = (mealsItems) => {
  const itemsDiv = document.getElementById("meal-ingredients");
  itemsDiv.style.display = "block";
  itemsDiv.innerHTML = `
    <div class="meal-ingredients">
       <img src="${mealsItems.strMealThumb}" alt="" />
          <h2>${mealsItems.strMeal}</h2>
           <h3>Ingredients</h3>
          <ul >
            <li>${mealsItems.strIngredient1}</li>
            <li>${mealsItems.strIngredient2}</li>
            <li>${mealsItems.strIngredient3}</li>
            <li>${mealsItems.strIngredient4}</li>
            <li>${mealsItems.strIngredient5}</li>
            <li>${mealsItems.strIngredient6}</li>
            <li>${mealsItems.strIngredient7}</li>
            <li>${mealsItems.strIngredient8}</li>
            <li>${mealsItems.strIngredient9}</li>
            <li>${mealsItems.strIngredient10}</li>
          </ul>
         
          <h3>Instructions</h3>
          <p>${mealsItems.strInstructions}</p>
    </div>
    
    `;
};
