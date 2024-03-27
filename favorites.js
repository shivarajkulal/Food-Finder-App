// Event listener to run when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Call the displayMeal function to show favorite meals
  displayMeal();
});

// Function to display favorite meals
function displayMeal() {
  // Get the container element for favorite meals list
  const favoriteMealsList = document.getElementById("favoriteMealsList");
  // Retrieve favorite meals from localStorage, if any
  const favoriteMeals = JSON.parse(localStorage.getItem("favoriteMeals")) || [];

  // Check if there are no favorite meals
  if (favoriteMeals.length === 0) {
    // Display a message indicating no favorite meals added yet
    favoriteMealsList.innerHTML =
      '<div><img src="https://static.vecteezy.com/system/resources/previews/004/231/366/non_2x/street-food-cart-free-vector.jpg" alt="empty" width="400px"/><p class="text-center fs-5 text-danger">No favorite meals added yet.</p></div>';
  } else {
    // Iterate through each favorite meal
    favoriteMeals.forEach((meal) => {
      // Create a visual representation (card) for the meal
      const mealElement = createMealElement(meal);
      // Append the meal element to the favorite meals list
      favoriteMealsList.appendChild(mealElement);
    });
  }
}

// Function to create a visual representation (card) for a meal
function createMealElement(meal) {
  // Create a div element for the meal card
  const mealDiv = document.createElement("div");
  mealDiv.classList.add("card");

  // Create an image element for the meal image
  const mealImage = document.createElement("img");
  mealImage.src = meal.strMealThumb;
  mealImage.alt = meal.strMeal;
  mealImage.classList.add("card-img-top");

  // Create an h5 element for the meal name
  const mealName = document.createElement("h5");
  mealName.textContent = meal.strMeal;

  // Create a button element for removing the meal from favorites
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("btn", "btn-danger");
  // Add event listener to remove the meal when the button is clicked
  removeButton.addEventListener("click", () => {
    removeMealFromFavorites(meal);
    mealDiv.remove();
  });

  // Append the elements to the meal card div
  mealDiv.appendChild(mealImage);
  mealDiv.appendChild(mealName);
  mealDiv.appendChild(removeButton);

  return mealDiv;
}

// Function to remove a meal from favorites
function removeMealFromFavorites(mealToRemove) {
  // Retrieve favorite meals from localStorage
  const favoriteMeals = JSON.parse(localStorage.getItem("favoriteMeals")) || [];
  // Filter out the meal to be removed based on its id
  const updatedFavoriteMeals = favoriteMeals.filter(
    (meal) => meal.idMeal !== mealToRemove.idMeal
  );
  // Update the favorite meals in localStorage
  localStorage.setItem("favoriteMeals", JSON.stringify(updatedFavoriteMeals));
  // Re-display the favorite meals after removing the meal
  displayMeal();
}
