const getMealBtn = document.getElementById("getMealBtn");
const mealInfo = document.querySelector(".meal-info");
const mealImage = document.getElementById("mealImage");
const mealName = document.getElementById("mealName");
const mealCategory = document.getElementById("mealCategory");
const mealIngredients = document.getElementById("mealIngredients");
const mealArea = document.getElementById("mealArea");
const mealInstructions = document.getElementById("mealInstructions");
const mealVideo = document.getElementById("mealVideo");
const categorySelect = document.getElementById("categorySelect");
const filterByCategoryBtn = document.getElementById("filterByCategoryBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
let currentMeal = null;


// Event listener for the "Filter" button
filterByCategoryBtn.addEventListener("click", () => {
  const selectedCategory = categorySelect.value;
  if (selectedCategory !== "") {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          const randomMealIndex = Math.floor(Math.random() * data.meals.length);
          const mealId = data.meals[randomMealIndex].idMeal;
          // Fetch and display the meal details by mealId
          fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
          )
            .then((response) => response.json())
            .then((data) => {
              const meal = data.meals[0];
              currentMeal = meal; // Store the current meal details
              displayMealDetails(meal);
            })
            .catch((error) => console.error(error));
        } else {
          // Handle the case where no meals in the selected category were found
          alert("No meals in the selected category found.");
        }
      })
      .catch((error) => console.error(error));
  } else {
    // Handle the case where no category is selected
    alert("Please select a category.");
  }
});


// Event listener for the "Favorite" button
favoriteBtn.addEventListener("click", () => {
  if (currentMeal) {
    const mealId = currentMeal.idMeal;
    const favoriteMeals =
      JSON.parse(localStorage.getItem("favoriteMeals")) || [];

    // Check if the meal is already in the favorites
    const isFavorite = favoriteMeals.some(
      (favMeal) => favMeal.idMeal === mealId
    );

    if (!isFavorite) {
      favoriteMeals.push(currentMeal);
      localStorage.setItem("favoriteMeals", JSON.stringify(favoriteMeals));
      alert("Meal added to favorites!");
    } else {
      alert("Meal is already in favorites!");
    }
  } else {
    alert("No meal to add to favorites.");
  }
});


// Display a random meal when the page is loaded
displayRandomMeal();

// Event listener for the "Get Meal" button
getMealBtn.addEventListener("click", () => {
  displayRandomMeal();
});


// Function to display a random meal
function displayRandomMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      currentMeal = meal; // Store the current meal details
      displayMealDetails(meal);
    })
    .catch((error) => console.error(error));
}

// Function to display meal details
function displayMealDetails(meal) {
  mealImage.src = meal.strMealThumb;
  mealName.textContent = meal.strMeal;
  mealCategory.textContent = meal.strCategory;
  mealIngredients.innerHTML = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = `${meal[`strIngredient${i}`]} - ${
        meal[`strMeasure${i}`]
      }`;
      mealIngredients.appendChild(ingredientItem);
    }
  }
  mealArea.textContent = meal.strArea;
  mealInstructions.textContent = meal.strInstructions;
  mealVideo.innerHTML = `<iframe src="${meal.strYoutube.replace(
    "watch?v=",
    "embed/"
  )}" frameborder="0" allowfullscreen></iframe>`;
  mealInfo.style.display = "block";
}


