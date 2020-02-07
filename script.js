//Recipe Search button handler
$("#findRecipe").on("click", function() {
	event.preventDefault();
	search($("#keywordInput").val())
});

$("#recipe-results").on("click", function(event){
	const element = event.target;

	//end the function if the an x-button wasn't clicked
	if($(element).attr("class").indexOf("x-button") === -1){
		return;
	}
	
	//remove the line that had the button
	$($(element).parent()).remove();

	//get the new amount of ingredients and update each ingredients id to match it's new position
	displayTotalCal(updateIngredients());
});

//reapplies the calCnt id's to match their order
//also returns the new number of ingredients
function updateIngredients(){
	let ingredientAmt = 0;

	let resultsChildren = $("#recipe-results").children();

	//Recalculate the amount of ingredients and reapply classes
	for(let resultIndex = 0, buttonIndex = 1; resultIndex < resultsChildren.length; resultIndex++){
		const $currentElement = $(resultsChildren[resultIndex]);
		
		//only change things if they are an ingredient line
		if($currentElement.attr("class") === "ingredient-line"){
			ingredientAmt++;
			
			//update the class of the span
			$($($currentElement.children()[1]).children()[0]).attr("id", `calCnt${ingredientAmt}`);
		}
	}
	return ingredientAmt;
}

//searches for a recipe and displays the ingredients
function search(searchTerm){

	var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm;

	var mealDB = {
    	url : queryURL,
    	method : "GET"
	};

	$.ajax(mealDB).done(function (response) {
		$("#welcome-title").html("");
		$("#recipe-title").html("");
		$("#ingredient-list").html("");
		$("#dish-image").html("");
		if (response.meals === null) {
			$("#recipe-title").append('<h2 class="text-center display-3"> No results found </h2>');
			return;		
		}

		var recipeLink = response.meals[0].strSource;
		console.log(recipeLink)
		$("#recipe-title").append(`<center><a href="${recipeLink}" class="text-center display-3 recipe-name" target="_blank">${response.meals[0].strMeal}</a></center>`);
		
		var imgURL = response.meals[0].strMealThumb;
        //   // Creating an element to hold the image
        console.log(imgURL);
		
		//   // Appending the image
		if (imgURL != undefined) {
			var image = $("<img class='food-pic'>").attr("src", imgURL);
			
			$("#dish-image").append(image);
		}
		
		


		//Add each ingredient to results
		var i = 1;
		var strIng = "strIngredient" + i;
		var strMeas = "strMeasure" + i;
		while(response.meals[0][strIng] !== ""){
			i++;

			//add new line with x button, ingredient name, and calorie amount
			$("#ingredient-list").append(`
			
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
		//Call for total calories and function here
		//These should be in separate functions because we want to be able to reset them if we remove an ingredient
		$("#ingredient-list").append(`
		<p class="total-cal">Total Calories: <span id="total-calories"></span></p>
		`);
		
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
		"url": "http://api.edamam.com/api/nutrition-data?app_id=395930c7&app_key=6556f73460c0aab9c0e3bd2d000aa822&ingr=" + input,
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
