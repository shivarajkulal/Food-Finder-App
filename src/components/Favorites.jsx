import React, { useEffect } from "react";
import diet from "../images/diet.png";
import { Link } from "react-router-dom";
import "../styles/Favorites.css";

function Favorites() {
  useEffect(() => {
    displayFavoriteMeals();
  }, []);

  // Function to display favorite meals
  const displayFavoriteMeals = () => {
    const favoriteMealsList = document.getElementById("favoriteMealsList");
    favoriteMealsList.innerHTML = ""; // Clear existing content before displaying

    const favoriteMeals =
      JSON.parse(localStorage.getItem("favoriteMeals")) || [];

    if (favoriteMeals.length === 0) {
      favoriteMealsList.innerHTML =
        '<div class="favor-img"><img src="https://cdn-icons-png.flaticon.com/256/12679/12679422.png" alt="empty" width="200px"/><p class="text-center fs-5 text-danger">No favorite meals added yet.</p></div>';
    } else {
      favoriteMeals.forEach((meal) => {
        const mealElement = createMealCard(meal);
        favoriteMealsList.appendChild(mealElement);
      });
    }
  };

  // Function to create a visual representation (card) for a meal
  const createMealCard = (meal) => {
    const mealCard = document.createElement("div");
    mealCard.classList.add("meal-card");

    const mealImage = document.createElement("img");
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;
    mealImage.classList.add("meal-card-image");
    mealImage.width = 200; // Set the width of the image (adjust as needed)
    mealImage.height = 200; // Set the height of the image (adjust as needed)

    const mealName = document.createElement("h5");
    mealName.textContent = meal.strMeal;
    mealName.classList.add("meal-card-name");

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", () => {
      removeMealFromFavorites(meal);
      mealCard.remove();
    });

    mealCard.appendChild(mealImage);
    mealCard.appendChild(mealName);
    mealCard.appendChild(removeButton);

    return mealCard;
  };

  // Function to remove a meal from favorites
  const removeMealFromFavorites = (mealToRemove) => {
    const favoriteMeals =
      JSON.parse(localStorage.getItem("favoriteMeals")) || [];
    const updatedFavoriteMeals = favoriteMeals.filter(
      (meal) => meal.idMeal !== mealToRemove.idMeal
    );
    localStorage.setItem("favoriteMeals", JSON.stringify(updatedFavoriteMeals));
    // You can optionally call displayFavoriteMeals() here if you want the UI to update immediately after removing a meal
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-main-container">
          <a className="Brand-icon" href="#">
            <img src={diet} alt="logo" width="40" className="icon-img" />
            <span> Meal Generator</span>
          </a>
          <div className="navbar-container" id="navbarContainer">
            <ul className="navbar-link-list">
              <li className="nav-item">
                <Link className="nav-link-home" to="/">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <h1 className="fovorite-meal">Favorite Food</h1>
        <div id="favoriteMealsList" className="favorite-meals-list"></div>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 FoodFinder.com</p>
        </div>
      </footer>
    </div>
  );
}

export default Favorites;
