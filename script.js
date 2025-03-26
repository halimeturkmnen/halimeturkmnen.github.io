document.addEventListener("DOMContentLoaded", function () {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            document.getElementById("meal-name").textContent = meal.strMeal;
            document.getElementById("meal-image").src = meal.strMealThumb;
            document.getElementById("meal-instructions").textContent = meal.strInstructions;

            let ingredientsList = "";
            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`]) {
                    ingredientsList += `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
                }
            }
            document.getElementById("meal-ingredients").innerHTML = ingredientsList;
        })
        .catch(error => console.error("Error fetching the meal:", error));
});
