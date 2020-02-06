//To be replaced with and event listner
$("#findRecipe").on("click", function() {
	event.preventDefault();
	search($("#keywordInput").val())
});
// search("sandwich")
//searches for a recipe and displays the ingredients
function search(searchTerm){

	var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm;

	var mealDB = {
    	url : queryURL,
    	method : "GET"
	};

	$.ajax(mealDB).done(function (response) {
		console.log(response)
		$("#recipe-results").html("");
		$("#recipe-results").append(`<h2 class="text-center display-3 recipe-name">${response.meals[0].strMeal}</h2>`)


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
            <p class="ingredient-info">${response.meals[0][strMeas]} ${response.meals[0][strIng]}: <span id="calCnt${i}"></span> Calories</p>
        	</span>
			
			`);

			appendCalorie(response.meals[0][strIng], response.meals[0][strMeas], i);

			strIng = "strIngredient" + i;
			strMeas = "strMeasure" + i;
		}
		//At this point, i - 1 is the total amount of ingredients

		//Call for total calories and function here
		//These should be in separate functions because we want to be able to reset them if we remove an ingredient

	});

}

//Only works when called inside the search function
function appendCalorie(ingredient, amount, index){

	var calories = 0;

	var combined = amount + " " + ingredient;
	var temp = combined.split(" ");
	var input = temp.join("%20");

	var settings = {
    	"async": true,
		"crossDomain": true,
		"url": "http://api.edamam.com/api/nutrition-data?app_id=e24df21e&app_key=6cbe820b002b9470dcefe91f4b454270&ingr=" + input,
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

//put function to handle deleting an ingredient below here

//put an event listner for the buttons below here
//There should be one for submitting and one for deleting ingredients
