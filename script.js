const api_key = "829b195aadec76715638d2dab724461b";



function testFetch (){
    var posterBaseUrl = 'https://image.tmdb.org/t/p/w500/';
    var popularPeopleBaseUrl = 'https://api.themoviedb.org/3/person/popular?api_key=';
   var peopleEnd = '&language=en-US&page=1';
//    https://api.themoviedb.org/3/person/popular?api_key=829b195aadec76715638d2dab724461b&language=en-US&page=1


//    fetch("https://api.themoviedb.org/3/search/multi?api_key="+api_key+"&language=en-US&query=matrix&page=2&include_adult=false")
//    .then(response => response.json())
//    .then(data => {
//        for(var i=0 ; i<data.results.length ; i++) {
//console.log(data.results[i]);

//console.log(data.results[i].title);
//console.log(data.results[i].overview);
//console.log(data.results[i].id);
//        }
//    });
}

init();






// -- initializing
function init() {
    addMovies();
    addPeople();
    addGenres();
    addCarousels();

    // */
}

function addCarousels(){
    bulmaCarousel.attach('#saved-for-later', {
        slidesToScroll: 1,
        slidesToShow: 6
    });


   bulmaCarousel.attach('#highest-rated', {
        slidesToScroll: 4,
        slidesToShow: 4
    });

}


function addPeople() {
    fetch("https://api.themoviedb.org/3/person/popular?api_key="+api_key+"&language=en-US&page=1")
    .then(response => response.json())
    .then(data => {
        var people = $("#people");
        people.empty();    
        for(var i=0 ; i<data.results.length ; i++) {
            people.append(`
            <!-- CARD ITEM-->
            <div class="column is-2">
                <div class="card image" value="`+data.results[i].id+`">
                    <img class="img-person" src="https://image.tmdb.org/t/p/w500`+data.results[i].profile_path+`">
                    <h2 class="card-title">`+data.results[i].name+`</h2>
                </div>
            </div>

      `);
        }
    addPeopleListeners();
    });

}


function addPeopleListeners() {
    var genre = $("#people>div>.card");
    genre.on("click", function(e){
        var val = e.target.getAttribute("value");
        if (val == null) {
            val = e.target.parentElement.getAttribute("value");
        }
        if (val == null) {
            val = e.target.parentElement.parentElement.getAttribute("value");
        }
        console.log(val);
    });
}    


function addMovies() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key="+api_key+"&language=en-US&page=1")
    .then(response => response.json())
    .then(data => {
        var highest_rated = $("#highest-rated");
        highest_rated.empty();    
 console.log(data);       
         for(var i=0 ; i<data.results.length ; i++) {
             var item = i+1;
             highest_rated.append(`
             <!-- CARD ITEM-->
             <div class="column is-2 item-`+item+`">
                 <div class="card image" value="`+data.results[i].id+`">
                     <img class="img-movie" src="https://image.tmdb.org/t/p/w500`+data.results[i].poster_path+`">
                     <h2 class="card-title">`+data.results[i].title+`</h2>
                     <button class="button-subtle">Watch on</button>

                 </div>
             </div>

       `);
         }
    addMovieListeners();
    });

}

// Hover - delay 300ms show popup, autoplays trailer, onMouseExit delay 100ms hide show video player - on movies
// Watch on - dropdown option with service providers redirects to i.e. Netflix
// bonus* deeplink to actual listing
function addMovieListeners() {
    var genre = $("#highest-rated>div>.card");
    genre.on("click", function(e){
        var val = e.target.getAttribute("value");
        if (val == null) {
            val = e.target.parentElement.getAttribute("value");
        }
        if (val == null) {
            val = e.target.parentElement.parentElement.getAttribute("value");
        }
        console.log(val);
    });
}    





function addGenres() {
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key="+api_key+"&language=en-US")
    .then(response => response.json())
    .then(data => {
        var genres = $("#genres");
        genres.empty();    
        for(var i=0 ; i<data.genres.length ; i++) {
            genres.append(`
            <!-- CARD ITEM-->
           <div class="column is-2">
                <div class="card horror `+data.genres[i].name+`" value="`+data.genres[i].id+`">
                    <h1 class="category-icon"><i class="fas fa-ghost"></i></h1>
                    <h2 class="card-title">`+data.genres[i].name+`</h2>
                </div>
            </div>
        `);
        }
    addGenreListeners();
    });

}



    // clicking on a genre triggers a search query with that term
function addGenreListeners() {
    var genre = $("#genres>div>.card");
    genre.on("click", function(e){
        var val = e.target.getAttribute("value");
        if (val == null) {
            val = e.target.parentElement.getAttribute("value");
        }
        if (val == null) {
            val = e.target.parentElement.parentElement.getAttribute("value");
        }
        
    });    
}    



// search localStorage for saved preferences
function getPreferences() {
//    console.log("function getPreferences() called.");  /*  
    var rtn = true;
    return rtn;
// */
}

// build fetch request from any exisiting data
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
var search = $("#search-term");
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
   var request = "api.someSite.com?"+string+"/endpint";
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