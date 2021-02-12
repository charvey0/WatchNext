
const api_key = "829b195aadec76715638d2dab724461b";

$(document).ready (function () {
    init();
    addMovies();
    addPeople();
    addGenreListeners();

    $("#listButton").on("click", function() {
        var text = $("#listButton").text();
        if (text == "Show My List") {
            $("#myListHeader").show();
            $("#saved-for-later").show();
            $("#listButton").text("Hide My List");
        } else {
            $("#myListHeader").hide();
            $("#saved-for-later").hide();
            $("#listButton").text("Show My List");
        }
    });

    $("#suggestButton").on("click", function() {
        addMovies();
        addPeople();
    });

    $("#searchButton").on("click", function() {
        var string = $("#search-term").val();
console.log(string);
        var req = "https://api.themoviedb.org/3/search/multi?api_key="+api_key+"&query="+string+"&language=en-US";
        fetch (req)
        .then(response => response.json())
        .then(data => {
            if (data) {
                displaySearchResults(data);
            } else {
          // Zero results view returns to main view
            console.log("nothing here");
                init();
            }
        });
    });
});


// -- initializing
function init() {
    showWatchList();
    $("#itemDisplay").empty();
    $("#hero").show();
    $("#groupedLists").show();
}



function showWatchList (){
    var list = getWatchList();

    var stop = 6;
    var watchList = $("#saved-for-later");
    watchList.empty();    

    if (list.length == 0) {
        watchList.append(`You have not added anything to your list, yet.`);
    }

    if (list.length<stop){
        stop = list.length;
    }

    for (var i=0 ; i<stop ; i++){
        var req = "https://api.themoviedb.org/3/movie/"+list[i]+"?api_key="+api_key+"&language=en-US";
        fetch(req)
        .then(response => response.json())
        .then(data => {
            watchList.append(`
            <!-- CARD ITEM-->
            <div class="column is-2">
                <div class="card image list-movie" value="`+list[i]+`">
                    <img class="img-movie" src="https://image.tmdb.org/t/p/w500/`+data.poster_path+`">
                    <h2 class="card-title">`+data.title+`</h2>
                    <a href="#" class="button-subtle">Watch on</a>

                </div>
            </div>

            `);
   
        });
        $(".list-movie").on("click", function() {
            console.log("$this");
        })
    }

}    






function addPeople() {
    var int = Math.floor(Math.random() * 100) + 1;
    fetch("https://api.themoviedb.org/3/person/popular?api_key="+api_key+"&language=en-US&page="+int)
    .then(response => response.json())
    .then(data => {
        var people = $("#people");
        people.empty();    
        for(var i=0 ; i<6 ; i++) {
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
        displayPerson(val);
    });
}    


function displayPerson(id) {
console.log(id);    
    var req = "https://api.themoviedb.org/3/person/"+id+"?api_key="+api_key+"&language=en-US";
    fetch (req)
    .then(response => response.json())
    .then(data => {

var html = `
<!-- SEARCH RESULTS CONTAINER-->

    <div style="width:75%; margin:auto;">
        <!-- SEARCH RESULTS TITLE AND NUMBER-->
        <div class="columns">
            <div class="column is-2" >
                <button class="button-secondary" id="backButton" style="margin-top:40px; width: 100%;"><i class="fas fa-arrow-left" style="padding-right: 12px;"></i> Back</button>
                </div>`;
                        html += `</div>
                    <div class="search-cards">
        <div class="inner-layout">
            <h2 class="search-card-header">`+data.name+`</h2>
            <p class="search-card-description">`+data.biography+`</p>
            <ul id="tags" style="padding-bottom: 28px;">
                <p style="color: white;">Date of Birth</p>
                <li id="tags">`+data.birthday+`</li>`;
            if (data.deathday) {
                html += `                <p style="color: white;">Date of Death</p>
                <li id="tags">`+data.deathday+`</li>
                `;
            }
            html += `    
            </ul>
            <ul id="tags" style="padding-bottom: 28px;">
                <p style="color: white;">Birthplace</p>
                <li id="tags">`+data.place_of_birth+`</li>
            </ul>
        </div>
        <div>
        <img src="https://image.tmdb.org/t/p/w300`+data.profile_path+`">
        </div>
    </div>
    </div>`;

    $("#itemDisplay").html(html);
    $("#itemDisplay").show();
    $("#hero").hide();
    $("#groupedLists").hide();

    $("#backButton").on("click", function(e) {
        init();
    });
        
    });
}


function addMovies() {
    var int = Math.floor(Math.random() * 100) + 1;
    var req = "https://api.themoviedb.org/3/discover/movie?api_key="+api_key+"&sort_by=popularity.desc&include_adult=false&include_video=true&page="+int;
    var g = getGenre();
    if (g != null) {
        req += "&with_genres=";
        req += g;
    }
console.log(req);    
    fetch(req)
    .then(response => response.json())
    .then(data => {
        var highest_rated = $("#highest-rated");
        highest_rated.empty();    
         for(var i=0 ; i<6 ; i++) {
             var item = i+1;
             highest_rated.append(`
             <!-- CARD ITEM-->
             <div class="column is-2 item-`+item+`">
                 <div class="card image" value="`+data.results[i].id+`">
                     <img class="img-movie" src="https://image.tmdb.org/t/p/w500/`+data.results[i].poster_path+`">
                     <h2 class="card-title">`+data.results[i].title+`</h2>`);
//                   html += `<a href="#" class="button-subtle">Watch on</a>`;

            highest_rated.append(`</div>
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
        displayMovie(val);
    });
}    



function displayMovie(id) {
console.log(id);    
    var html = "";
    var req = "https://api.themoviedb.org/3/movie/"+id+"?api_key="+api_key+"&language=en-US";
    fetch (req)
    .then(response => response.json())
    .then(data => {
        html += `
        <div style="width:75%; margin:auto;">
        <!-- SEARCH RESULTS TITLE AND NUMBER-->
        <div class="columns">
            <div class="column is-2" >
                <button class="button-secondary" id="backButton" style="margin-top:40px; width: 100%;"><i class="fas fa-arrow-left" style="padding-right: 12px;"></i> Back</button>
            </div>`;
        html += `</div>
        <div class="search-cards">

        <div class="inner-layout">
                <h2 class="search-card-header">`+data.title+`</h2>
                <h3>`+data.tagline+`</h3>

                <p class="search-card-description">`+data.overview+`</p>
                <ul id="tags" style="padding-bottom: 28px;">
                    <p style="color: white;">Release Date</p>
                    <li id="tags">`+data.release_date+`</li>
                    <p style="color: white;">Vote Average</p>
                    <li id="tags">`+data.vote_average+`</li>
                    <p style="color: white;">Vote Count</p>
                    <li id="tags">`+data.vote_count+`</li>                    `;

                html += `    
                </ul>`;
                

                html += `<button class="button-primary" id="watch-on" value="`+data.id+`">Watch on</button>`;
                html += `<button class="button-secondary" id="watch-list" value="`+data.id+`">Add to Watch List</button>`;
            html += `</div>
            <div>
            <img src="https://image.tmdb.org/t/p/w300/`+data.poster_path+`">
            </div>
        </div>
        </div>`;

        $("#itemDisplay").html(html);
        $("#itemDisplay").show();
        $("#groupedLists").hide();
        $("#hero").hide();

        $("#backButton").on("click", function(e) {
            init();
        });

        $("#watch-on").on("click", function(e) {
            var req = "https://api.themoviedb.org/3/movie/"+e.target.getAttribute('value')+"/watch/providers?api_key="+api_key;
            fetch (req)
            .then(response => response.json())
            .then(data => {
                window.open(data.results.US.link);
            });    
        });

        $("#watch-list").on("click", function(e) {
            addToWatchList(e.target.getAttribute('value'));
        });
       

    });


}


function addToWatchList(movie) {
    var list = getWatchList();
    if (!list.includes(movie)) {
        list.push(movie);
        setWatchList(list);
        console.log(list);
    } else { 
        console.log(movie+" is already in the WatchList.");
    }
   init();
}

function getWatchList() {
    var list = localStorage.getItem("watchList");
    if (list == null) {
        list = [];
        setWatchList(list);
    }
    return JSON.parse(list);
} 

function setWatchList(list) {
    localStorage.setItem("watchList", JSON.stringify(list));
} 



function getGenre() {
    var genre = localStorage.getItem("genre");
    if (genre == null) {
        genre = [];
        setWatchList(genre);
    }
    return JSON.parse(genre);
}

function setGenre(g) {
    localStorage.setItem("genre", JSON.stringify(g));
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
        if (val == getGenre()) {
            setGenre(null);
        } else {
            setGenre(val);        
        }
    });    
}    

   



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



function displaySearchResults(data) {
    console.log(data.results.length);    
    var stop = data.results.length;
    var html = `
        <!-- SEARCH RESULTS CONTAINER-->
            <div style="width:75%; margin:auto;">
                <!-- SEARCH RESULTS TITLE AND NUMBER-->
                <div class="columns">
                    <div class="column is-2" >
                        <button class="button-secondary" id="backButton" style="margin-top:40px; width: 100%;"><i class="fas fa-arrow-left" style="padding-right: 12px;"></i> Back</button>
                    </div>
                    <div class="column is-10">
                        <h1 class="search-result-text" id="result-information"><span id="numberOfResults"></span> Results:<span style="color: white; font-weight: 700;"></span></h1>
                    </div>
                </div>`;
                for (var i=0 ; i<data.results.length ; i++) {
                    console.log(data.results[i]);
                
                if (data.results[i].media_type == "person") {
                    html += `<div class="search-cards">
                         <div class="inner-layout">
                             <h2 class="search-card-header">`+data.name+`</h2>
                             <p class="search-card-description">`+data.biography+`</p>
                             <ul id="tags" style="padding-bottom: 28px;">
                                 <p style="color: white;">Date of Birth</p>
                                 <li id="tags">`+data.birthday+`</li>`;
                     if (data.deathday) {
                         html += `                <p style="color: white;">Date of Death</p>
                         <li id="tags">`+data.deathday+`</li>
                         `;
                     }
                     html += `    
                     </ul>
                     <ul id="tags" style="padding-bottom: 28px;">
                         <p style="color: white;">Birthplace</p>
                         <li id="tags">`+data.place_of_birth+`</li>
                     </ul>
                 </div>
                 <div>
                 <img src="https://image.tmdb.org/t/p/w300`+data.profile_path+`">
                 </div>
             </div>`;
                    } else if (data.results[i].media_type == "movie") {
                        html += `</div>
                        <div class="search-cards">
                
                        <div class="inner-layout">
                                <h2 class="search-card-header">`+data.results[i].title+`</h2>
                                <h3>`+data.results[i].tagline+`</h3>
                
                                <p class="search-card-description">`+data.results[i].overview+`</p>
                                <ul id="tags" style="padding-bottom: 28px;">
                                    <p style="color: white;">Release Date</p>
                                    <li id="tags">`+data.results[i].release_date+`</li>
                                    <p style="color: white;">Vote Average</p>
                                    <li id="tags">`+data.results[i].vote_average+`</li>
                                    <p style="color: white;">Vote Count</p>
                                    <li id="tags">`+data.results[i].vote_count+`</li>                    `;
                
                                html += `    
                                </ul>`;
                                
                
                                html += `<button class="button-primary" id="watch-on" value="`+data.results[i].id+`">Watch on</button>`;
                                html += `<button class="button-secondary" id="watch-list" value="`+data.results[i].id+`">Add to Watch List</button>`;
                            html += `</div>
                            <div>
                            <img src="https://image.tmdb.org/t/p/w300/`+data.poster_path+`">
                            </div>
                        </div>
                        </div>`;
                
                    }



                }
            html += `</div>`;
        
            $("#itemDisplay").html(html);
            $("#itemDisplay").show();
            $("#hero").hide();
            $("#groupedLists").hide();
        
            $("#backButton").on("click", function(e) {
                init();
            });
                
//            });
        
// Append number of results to the header and search string
    $("#numberOfResults").text(stop);


}


// OnFocus displays dropdown with dynamic string query matching

// OnClick/enterKey submit search and navagates to results page



// Ability to clear the search using 'x' button
var clearSearch = $("#clearSearch");
clearSearch.on("click", function() {
    search.empty();
    itemDisplay.empty();
});







// Suggests movie based on time*