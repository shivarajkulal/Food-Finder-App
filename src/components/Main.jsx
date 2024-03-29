import React, { useState, useEffect } from "react";
import '../styles/Main.css';
import diet from "../images/diet.png";
import { Link } from "react-router-dom";


function Main() {
  const [currentMeal, setCurrentMeal] = useState(null);

  useEffect(() => {
    displayRandomMeal();
  }, []);

  const handleFilterByCategory = () => {
    const selectedCategory = document.getElementById("categorySelect").value;
    if (selectedCategory !== "") {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.meals) {
            const randomMealIndex = Math.floor(
              Math.random() * data.meals.length
            );
            const mealId = data.meals[randomMealIndex].idMeal;
            fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
            )
              .then((response) => response.json())
              .then((data) => {
                const meal = data.meals[0];
                setCurrentMeal(meal);
                displayMealDetails(meal);
              })
              .catch((error) => console.error(error));
          } else {
            alert("No meals in the selected category found.");
          }
        })
        .catch((error) => console.error(error));
    } else {
      alert("Please select a category.");
    }
  };

  const handleFavorite = () => {
    if (currentMeal) {
      const mealId = currentMeal.idMeal;
      const favoriteMeals =
        JSON.parse(localStorage.getItem("favoriteMeals")) || [];

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
  };

  const displayRandomMeal = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((data) => {
        const meal = data.meals[0];
        setCurrentMeal(meal);
        displayMealDetails(meal);
      })
      .catch((error) => console.error(error));
  };

  const displayMealDetails = (meal) => {
    document.getElementById("mealImage").src = meal.strMealThumb;
    document.getElementById("mealName").textContent = meal.strMeal;
    document.getElementById("mealCategory").textContent = meal.strCategory;
    document.getElementById("mealIngredients").innerHTML = "";
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        const ingredientItem = document.createElement("li");
        ingredientItem.textContent = `${meal[`strIngredient${i}`]} - ${
          meal[`strMeasure${i}`]
        }`;
        document.getElementById("mealIngredients").appendChild(ingredientItem);
      }
    }
    document.getElementById("mealArea").textContent = meal.strArea;
    document.getElementById("mealInstructions").textContent =
      meal.strInstructions;
    document.getElementById(
      "mealVideo"
    ).innerHTML = `<iframe src="${meal.strYoutube.replace(
      "watch?v=",
      "embed/"
    )}" frameborder="0" allowfullscreen></iframe>`;
    document.querySelector(".food-info-container").style.display = "block";
  };

  return (
    <div className="App">

      <nav className="navbar">
        <div className="navbar-main-container">
          <a className="Brand-icon" href="#">
            <img src={diet} alt="logo" width="40" className="icon-img" />
          </a>
          <div className="navbar-container" id="navbarContainer">
            <ul className="navbar-link-list">
              <li className="nav-item">
                <Link className="nav-link-home" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link-favorites" to="/favorites">
                  Your Favorite Meals
                </Link>
              </li>
            </ul>
          </div>
          <div className="category-container">
            <select id="categorySelect" className="form-selector">
              <option value="">All Categories</option>
              <option value="Chicken">Chicken</option>
              <option value="Beef">Beef</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Lamb">Lamb</option>
              <option value="Pasta">Pasta</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
            <button
              id="filterByCategoryBtn"
              className="filter-button"
              onClick={handleFilterByCategory}
            >
              Filter
            </button>
          </div>
        </div>
      </nav>

      <header className="header">
        <div className="header-container">
          <div className="food-generator">
            <h2>Food Finder</h2>
            <p className="header-instruction">
              Get a random Food now by clicking the button below 👇
            </p>
            <button
              className="food-finder-button"
              id="getMealBtn"
              onClick={displayRandomMeal}
            >
              Get Meal
            </button>
          </div>
        </div>
      </header>

      <main className="main-container">
        <div className="food-info-container">
          <h1>Your Food</h1>
          <h2 id="mealName"></h2>
          <div className="food-info">
            <div className="food-info-img">
              <img
                id="mealImage"
                src=""
                alt="Meal Image"
                className="img-fluid"
              />
            </div>
            <div className="food-info-text">
              <p className="fs-3">
                <strong>Process of Making</strong>
              </p>
              <p id="mealInstructions"></p>
              <button
                id="favoriteBtn"
                className="favourite-button"
                onClick={handleFavorite}
              >
                Favorite
              </button>
            </div>
          </div>
          <hr />
          <div className="food-receipe-container">
            <h2>Food Details:</h2>

            <div className="food-details-container">
              <p>
                <strong>Category:</strong> <span id="mealCategory"></span>
              </p>
              <p>
                <strong>Area:</strong> <span id="mealArea"></span>
              </p>
              <p>
                <strong>Ingredients:</strong>
              </p>
              <ul id="mealIngredients"></ul>
            </div>
            <div className="video-receipe-container">
              <h2 className="video-receipe">Video Receipe:</h2>
              <div id="mealVideo"></div>
            </div>
          </div>
        </div>
      </main>

      <hr />

      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 FoodFinder.com</p>
        </div>
      </footer>
    </div>
  );
}

export default Main;
