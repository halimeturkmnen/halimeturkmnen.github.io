document.addEventListener("DOMContentLoaded", function () {
    function fetchMeal() {
        console.log("Fetching a new meal..."); 
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(response => response.json())
            .then(data => {
                const meal = data.meals[0];
                console.log("New meal data:", meal); 

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
    }

    
    fetchMeal();

    
    const button = document.getElementById("new-meal-btn");
    if (button) {
        button.addEventListener("click", function () {
            console.log("Button clicked! Fetching new meal...");
            fetchMeal();
        });
    } else {
        console.error("Button with ID 'new-meal-btn' not found!");
    }
});

    
