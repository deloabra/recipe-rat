search("sandwich");

function search(searchTerm){

	var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm;

	var mealDB = {
    	url : queryURL,
    	method : "GET"
	};

	$.ajax(mealDB).done(function (response) {
	console.log(response);
		$("#recipe-results").html("");
		$("#recipe-results").append(`<h2 class="text-center display-3 recipe-name">${response.meals[0].strMeal}</h2>`);


		//Add each ingredient to results
		var i = 1;
		var strIng = "strIngredient" + i;
		while(response.meals[0][strIng] !== ""){
			i++;

			//add new line with x button, ingredient name, and calorie amount
			$("#recipe-results").append(`
			
			<span class="ingredient-line" data-index=${i-1}>
            <button type="button" class="btn btn-danger fas fa-times x-button"></button>
            <p class="ingredient-info">${response.meals[0][strIng]}: <span></span> Calories</p>
        	</span>
			
			`);



			strIng = "strIngredient" + i;
		}

		

	});

}

function appendCalorie(ingredient, amount, index){
	
}







var settings = {
"async": true,
"crossDomain": true,
"url": "https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=apple",
"method": "GET",
"headers": {
"x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
"x-rapidapi-key": "1ec3d9fb69mshce60f1afc895cadp14a0d8jsn29ea1bef255a"
}};

$.ajax(settings).done(function (response) {
console.log(response);
});