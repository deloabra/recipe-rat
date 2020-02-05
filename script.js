var foodSearch = "";
var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + foodSearch;

var mealDB = {
    url : queryURL,
    method : "GET"
};

$.ajax(mealDB).done(function (response) {
console.log(response);
});

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
