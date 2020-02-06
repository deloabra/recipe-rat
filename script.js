//To be replaced with and event listner
search("kumpir");

//searches for a recipe and displays the ingredients
function search(searchTerm){

	var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm;

	var mealDB = {
    	url : queryURL,
    	method : "GET"
	};

	$.ajax(mealDB).done(function (response) {
		
		$("#recipe-results").html("");
		$("#recipe-results").append(`<h2 class="text-center display-3 recipe-name">${response.meals[0].strMeal}</h2>`);


		//Add each ingredient to results
		var i = 1;
		var strIng = "strIngredient" + i;
		var strMeas = "strMeasure" + i;
		while(response.meals[0][strIng] !== ""){
			i++;

			//add new line with x button, ingredient name, and calorie amount
			$("#recipe-results").append(`
			
			<span class="ingredient-line">
            <button type="button" class="btn btn-danger fas fa-times x-button"></button>
            <p class="ingredient-info">${response.meals[0][strMeas]} ${response.meals[0][strIng]}: <span id="calCnt${i-1}"></span> Calories</p>
        	</span>
			
			`);

			appendCalorie(response.meals[0][strIng], response.meals[0][strMeas], i-1);

			strIng = "strIngredient" + i;
			strMeas = "strMeasure" + i;
		}
		//At this point, i - 1 is the total amount of ingredients
		$("#recipe-results").append(`
		<p>Total Calories: <span id="total-calories"></span></p>
		`);
		//Call for total calories and function here
		//These should be in separate functions because we want to be able to reset them if we remove an ingredient
		// put element where total calories are
		displayTotalCal(i-1);
	});

}

//Only works when called inside the search function
function appendCalorie(ingredient, amount, index){

	var calories = 0;

	var combined = amount + " " + ingredient;
	var temp = combined.split(" ");
	var input = temp.join("%20");

	var settings = {
    	"async": false,
		"crossDomain": true,
		"url": "http://api.edamam.com/api/nutrition-data?app_id=0f7829ed&app_key=7d6cf61698734025c3847baa596cc57a&ingr=" + input,
    	"method": "GET"
	}

	$.ajax(settings).done(function (response) {
		calories = response.calories;

		//Prints the amount of calories to the span inside of class "ingredient-info"
		//the span is the first child of the second child of the line to be added
		//we use the index input because this loads asynchronously

		$(`#calCnt${index}`).text(calories);

	});
}

//put function to display total calories and exercise chart below here
function displayTotalCal(ingAmt) {
	var total=0;

		for (let i = 1; i <= ingAmt; i++) {
			const element = parseInt($(`#calCnt${i}`).text());
			total += element;
		}
	$("#total-calories").text(total);


}
//put function to handle deleting an ingredient below here

//put an event listner for the buttons below here
//There should be one for submitting and one for deleting ingredients
