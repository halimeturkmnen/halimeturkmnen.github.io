document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("category-select");
    const countrySelect = document.getElementById("country-select");
    const newMealBtn = document.getElementById("new-meal-btn");
    const mealContainer = document.getElementById("meal-container");
    const mealName = document.getElementById("meal-name");
    const mealImage = document.getElementById("meal-image");
    const mealIngredients = document.getElementById("meal-ingredients");
    const mealInstructions = document.getElementById("meal-instructions");
    const mealVideo = document.getElementById("meal-video");

    function fetchMeal(apiUrl) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    const randomMeal = data.meals[Math.floor(Math.random() * data.meals.length)];
                    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`);
                } else {
                    throw new Error("No meals found.");
                }
            })
            .then(response => response.json())
            .then(data => {
                const meal = data.meals[0];
                displayMeal(meal);
            })
            .catch(error => {
                mealContainer.innerHTML = `<p>No meal found. Try another selection.</p>`;
            });
    }

    function displayMeal(meal) {
        mealName.textContent = meal.strMeal;
        mealImage.src = meal.strMealThumb;
        mealImage.alt = meal.strMeal;
        mealInstructions.textContent = meal.strInstructions;

        mealIngredients.innerHTML = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
                const listItem = document.createElement("li");
                listItem.textContent = `${measure} ${ingredient}`;
                mealIngredients.appendChild(listItem);
            }
        }

        if (meal.strYoutube) {
            mealVideo.src = `https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`;
            mealVideo.style.display = "block";
        } else {
            mealVideo.style.display = "none";
        }

        mealContainer.style.display = "block";
    }

    newMealBtn.addEventListener("click", () => {
        const selectedCategory = categorySelect.value;
        const selectedCountry = countrySelect.value;

        let apiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php";

        if (selectedCategory && selectedCountry) {
            alert("Currently, filtering by both category and country at the same time is not supported. Please select either a category or a country, and set the other option to 'Random'");
            return;
        } else if (selectedCategory) {
            apiUrl += `?c=${selectedCategory}`;
        } else if (selectedCountry) {
            apiUrl += `?a=${selectedCountry}`;
        } else {
            apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
        }

        fetchMeal(apiUrl);
    });

    fetchMeal("https://www.themealdb.com/api/json/v1/1/random.php");
});


    
