const title = document.getElementById("recipeName");
const recipeIngListHolder = document.getElementById("recipeIngListHolder");
const recipeDirectionsListHolder = document.getElementById("recipeDirectionsListHolder");

fetch("http://localhost/recipe")
    .then(response => response.json().then(data => {
        title.innerText = "Recipe Name: " + data.name;
        let t = "";
        for (let elem of data.ingredients) {
            t += "- " + elem + "\n";
        }
        recipeIngListHolder.innerText = "Recipe Ingredients: " + t;
        t = "";
        for (let elem of data.ingredients) {
            t += "- " + elem + "\n";
        }
        recipeDirectionsListHolder.innerText = "Directions: " + t;
    }));