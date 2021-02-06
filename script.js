fetch("https://imdb8.p.rapidapi.com/title/get-genres?tconst=tt0944947", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "d31dcc5144msh43d70fa79e055ddp1b7ef4jsnbda00aeaa388",
		"x-rapidapi-host": "imdb8.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});








// -- initializing
function init() {
//    console.log("function init() called.");  /*  
    if (showMatches()){
        return true;        
    } else {
        return false;
    }
// */
}

// search localStorage for saved preferences
function getPreferences() {
//    console.log("function getPreferences() called.");  /*  
    var rtn = true;
    return rtn;
// */
}

// build fetch request form any exisiting data
function getMoviesRequest() {
//    console.log("function getMoviesRequest() called.");  /*  
    var request = "";

    if (getPreferences()) {
// if stored preferences pull that and other stuff
        request = "Preferences";
    } else {
// if nothing, do general fetch request
        request = "No Preferences";
    }

console.log(request);    
//    fetch (request)

    return true;
// */
}
    

// display top matches (watchList, genres, new, people*)
function showMatches () {
// append items in the watchList to a grouped list in the homepage
    var watchList = getWatchList();
    if (watchList){
        var stop = watchList.length;
        for (var i=0 ; i<stop ; i++) {
            console.log(watchList[i]);
        }
    }

    if (getMoviesRequest()) {
// show as grouped lists with titles (maybe carosel*)
// append saved items to a grouped list in the homepage
    } else {
// something went rong...        
    }
}

// -- OnClick/Hover card events

// Hover - delay 300ms show popup, autoplays trailer, onMouseExit delay 100ms hide show video player - on movies
// Watch on - dropdown option with service providers redirects to i.e. Netflix
// bonus* deeplink to actual listing
var movie = $(".movie");
movie.on("click", function(e){
  console.log("movie clicked.");
});

// clicking on a person triggers a search query with that name
var person = $(".person");
person.on("click", function(e){
    console.log("person clicked.");
});

// clicking on a genre triggers a search query with that term
var genre = $(".genre");
genre.on("click", function(e){
    console.log("genre clicked.");
});


// -- Add to watch list card events

// Button on movie tile and result to 'add to watchlist' save in localStorage
var addButton = $(".addButton");
addButton.on("click", function(e){
    console.log("addButton clicked.");
});

// Toggle button to remove - removes from localStorage
var removeButton = $(".removeButton");
removeButton.on("click", function(e){
    console.log("removeButton clicked.");
});


// -- Searching for something
// Search for something (movies, channel (streaming, + TV HBO Netflix, TV - CBS etc) person, show)
var search = $("#search");
var searchButton = $("#searchButton");
var resultsDisplay = $("#resultsDisplay");


searchButton.on("click", function(e) {
    var string = search.text();
    console.log(string);
    var results = searchFor(string);
    if (results) {
        displaySearchResults(results);
    } else {
    // Zero results view returns to main view
        init();
    }
});



function displaySearchResults(results) {
    var stop = results.length;

// Append number of results to the header and search string
    $("#numberOfResults").text(stop);

// clears display for new results
    resultsDisplay.empty();

    for (var i=0 ; i<stop ; i++) {
// OnLoad appends results cards - best match first.
        console.log(results[i]);
        var newDiv = $("<div>").addClass("result");
        newDiv.append("name, description, add to watchlist (icon buttons), more(...) expands inline to show more details Deeplink to service")
// -- Search results cards
// Display view preview
// Display name, description, add to watchlist (icon buttons), more(...) expands inline to show more details
// Deeplink to service


    }
}



function searchFor(string) {
   var success = false; 
   var request = ""+string+"";
   fetch(request)
   .then(results => results.json());
//   .then(data) {
//        if (data.code == 200) {
//            success = true;
//       }
//   }
   return success;
}

// OnFocus displays dropdown with dynamic string query matching

// OnClick/enterKey submit search and navagates to results page



// Ability to clear the search using 'x' button
var clearSearch = $("#clearSearch");
clearSearch.on("click", function() {
    search.empty();
    resultsDisplay.empty();
});



// Saving an item to localStorage [watchlist]
function addToWatchList(movie) {
    var list = getWatchList();
    if (!list.contains(movie)) {
        list.push(movie);
    } else { 
        console.log(movie+" is already in the WatchList.");
    }
    if (setWatchList(list)) {
        return true;
    } else {
        return false;
    }
}

function getWatchList() {
    var list = localStorage.getItem("watchList");
    if (list) {
        return JSON.parse(list);
    } else {
        return false;
    }
} 

function setWatchList(list) {
    return localStorage.setItem("watchList", JSON.stringify(list));
} 



// Suggests movie based on time*