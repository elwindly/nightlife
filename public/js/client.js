var baseUrl = location.origin;

    function handleClick(e){
        let updateCounter = e.name == -1 ? 1 : -1;
        let city = $('#search').val();
        let data = {placeId: e.id, addOrDeduct:updateCounter, city:city };
            $.ajax({
                url: `${baseUrl}/going`,
                type: 'POST',
                data: data,
                success: function(data, textStatus, request) {
                    if (data.shouldLogIn){
                        alert("You need to sign up/log in to use this function");
                    }else{
                        if (e.name == -1) {
                            e.name = "1";
                            e.value = `Going : ${data.going + 1} (including you)`; 
                        } else {
                             e.name = "-1";  
                             e.value = `Going : ${data.going - 1}`; 
                        }
                    }                   
                },
                error: function(e) {
                    console.log(e);
                    alert('"It did not work!"');
                }
            });
    };



$(document).ready(function(){

if(typeof(Storage) !== "undefined" && localStorage.getItem('search')){
    var searchTerm = localStorage.getItem("search");
    $('#search').val(searchTerm);
    getYelpSearchResult(searchTerm);
    localStorage.removeItem("search");
}


function infoPanelBuilder(arr){
    let result = $('#result');
    result.empty();
    for(let i = 0; i < arr.length; i++){
        let html = '<div class="media"</div>';

        html += '<div class="media-left media-top">';
        html += `<img src="${arr[i].image_url}" class="media-object" style="width:60px">`;
        html += `<img src="${arr[i].rating_img_url}" class="media-object" style="width:60px">`;
        html += '</div>';
        html += '<div class="media-body">';
        html += `<h4 class="media-heading"><a href=${arr[i].url} target='_blank'>${arr[i].name}</a></h4>`;
        html += `<p>${arr[i].display_address}</p>`;
        html += `<p>${arr[i].snippet_text}</p>`;
        if (arr[i].isGoing == -1) {
            html += `<input type="button" class="btn btn-info btn-sm" onclick="handleClick(this)" id="${arr[i].id}" name="${arr[i].isGoing}"  value="Going : ${arr[i].going}">`;   
        }else {
            html += `<input type="button" class="btn btn-info btn-sm" onclick="handleClick(this)" id="${arr[i].id}" name="${arr[i].isGoing}"  value="Going : ${arr[i].going} (including you)">`; 
        }
        //if(arr[i].going > 0){
            html += `<p class="${arr[i].id}">${arr[i].listOfUsers}</p>`;        
       // }            
        html += '</div>';
        html += '</div>';
        html += '</br>';
        result.append(html);
    }
}

function getYelpSearchResult(searchTerm) {
    let data = {searchTerm: searchTerm};
    $.ajax({
        url: `${baseUrl}/term`,
        type: 'POST',
        data: data,
        success: function(data, textStatus, request) {
            infoPanelBuilder(data);
            if(typeof(Storage) !== "undefined"){
                localStorage.setItem("search", searchTerm);
            }
        },
        error: function(e) {
            console.log(e);
            alert('"It did not work!"');
        }
    });
}

    $('#search').keypress(function(event){
        var searchTerm = $('#search').val();      
        if(event.which == 13 && searchTerm != ""){
            getYelpSearchResult(searchTerm);

        }
    });

    jQuery('#login').on('submit',function(e){
        e.preventDefault();
        var email = jQuery('[name=emailLog]').val();
        var pwd = jQuery('[name=pwdLog]').val();
        var data ={
            emailLog:email,
            pwdLog:pwd
        };
        $.ajax({
            url: `${baseUrl}/users/login`,
            type: 'POST',
            data: data,
            success: function(data, textStatus, request) {
            //$('#loginModal').modal('hide');     
                window.location.replace('/');
            },
            error: function(e) {
                console.log(e);
                alert('"Invalid username. email or password"');
            }
        });
    
    });



    jQuery('#signUp').on('submit',function(e){
        e.preventDefault();
        var email = jQuery('[name=email]').val();
        var pwd = jQuery('[name=password]').val();
        var name = jQuery('[name=name]').val();
        var data ={
            email:email,
            password:pwd,
            name:name
        };
        $.ajax({
            url: `${baseUrl}/users`,
            type: 'POST',
            data: data,
            success: function(data, textStatus, request) {
            $('#signUpModal').modal('hide');     
            window.location.replace('/');        
            },
            error: function(e) {
                console.log(e);
                alert("Username or email is already in use!");
            }
        });
    });



    jQuery('#logOut').on('click',function(e){
        e.preventDefault();
        $.ajax({
            url: `${baseUrl}/users/me/token`,
            type: 'DELETE',
            success: function(result) {
                window.location.replace('/');
                alert('You succesfully logged out');
            }
        });
    });

         var cities = [
            'Buenos Aires',
            'Adelaide',
            'Brisbane',
            'Melbourne',
            'Perth',
            'Sydney',
            'Wien',
            'Antwerpen',
            'Bruxelles',
            'Rio de Janeiro',
            'Sao Paulo',
            'Calgary',
            'Edmonton',
            'Halifax',
            'Montréal',
            'Ottawa',
            'Toronto',
            'Vancouver',
            'Santiago',
            'Praha',
            'København',
            'Helsinki',
            'Lyon',
            'Marseille',
            'Paris',
            'Berlin',
            'Frankfurt am Main',
            'Hamburg',
            'Köln',
            'München',
            'Milano',
            'Roma',
            '大阪市',
            'Kuala Lumpur',
            'México, D.F.',
            'Auckland',
            'Oslo',
            'Manila',
            'Kraków',
            'Warszawa',
            'Lisboa',
            'Dublin',
            'Singapore',
            'Barcelona',
            'Madrid',
            'Stockholm',
            'Zürich',
            '台北市',
            'Amsterdam',
            'İstanbul',
            'Belfast',
            'Brighton',
            'Bristol',
            'Cardiff',
            'Edinburgh',
            'Glasgow',
            'Leeds',
            'Liverpool',
            'London',
            'Manchester',
            'Phoenix',
            'Scottsdale',
            'Tempe',
            'Tucson',
            'Alameda',
            'Albany',
            'Alhambra',
            'Anaheim',
            'Belmont',
            'Berkeley',
            'Beverly Hills',
            'Big Sur',
            'Burbank',
            'Concord',
            'Costa Mesa',
            'Culver City',
            'Cupertino',
            'Daly City',
            'Davis',
            'Dublin',
            'Emeryville',
            'Foster City',
            'Fremont',
            'Glendale',
            'Hayward',
            'Healdsburg',
            'Huntington Beach',
            'Irvine',
            'La Jolla',
            'Livermore',
            'Long Beach',
            'Los Altos',
            'Los Angeles',
            'Los Gatos',
            'Marina del Rey',
            'Menlo Park',
            'Mill Valley',
            'Millbrae',
            'Milpitas',
            'Monterey',
            'Mountain View',
            'Napa',
            'Newark',
            'Newport Beach',
            'Oakland',
            'Orange County',
            'Palo Alto',
            'Park La Brea',
            'Pasadena',
            'Pleasanton',
            'Redondo Beach',
            'Redwood City',
            'Sacramento',
            'San Bruno',
            'San Carlos',
            'San Diego',
            'San Francisco',
            'San Jose',
            'San Leandro',
            'San Mateo',
            'San Rafael',
            'Santa Barbara',
            'Santa Clara',
            'Santa Cruz',
            'Santa Monica',
            'Santa Rosa',
            'Sausalito',
            'Sonoma',
            'South Lake Tahoe',
            'Stockton',
            'Studio City',
            'Sunnyvale',
            'Torrance',
            'Union City',
            'Venice',
            'Walnut Creek',
            'West Hollywood',
            'West Los Angeles',
            'Westwood',
            'Yountville',
            'Boulder',
            'Denver',
            'Hartford',
            'New Haven',
            'Washington, DC',
            'Fort Lauderdale',
            'Gainesville',
            'Miami',
            'Miami Beach',
            'Orlando',
            'Tampa',
            'Atlanta',
            'Savannah',
            'Honolulu',
            'Lahaina',
            'Iowa City',
            'Boise',
            'Chicago',
            'Evanston',
            'Naperville',
            'Schaumburg',
            'Skokie',
            'Bloomington',
            'Indianapolis',
            'Louisville',
            'New Orleans',
            'Allston',
            'Boston',
            'Brighton',
            'Brookline',
            'Cambridge',
            'Somerville',
            'Baltimore',
            'Ann Arbor',
            'Detroit',
            'Minneapolis',
            'Saint Paul',
            'Kansas City',
            'Saint Louis',
            'Charlotte',
            'Durham',
            'Raleigh',
            'Newark',
            'Princeton',
            'Albuquerque',
            'Santa Fe',
            'Las Vegas',
            'Reno',
            'Brooklyn',
            'Long Island City',
            'New York',
            'Flushing',
            'Cincinnati',
            'Cleveland',
            'Columbus',
            'Portland',
            'Salem',
            'Philadelphia',
            'Pittsburgh',
            'Providence',
            'Charleston',
            'Memphis',
            'Nashville',
            'Austin',
            'Dallas',
            'Houston',
            'San Antonio',
            'Salt Lake City',
            'Alexandria',
            'Arlington',
            'Richmond',
            'Burlington',
            'Bellevue',
            'Redmond',
            'Seattle',
            'Madison',
            'Milwaukee'
        ];

         $( "#search" ).autocomplete({
            source: cities
            });

});




























// var x = location.origin;
// console.log(x);
// console.log(`${x}/api/getPools`);
// fetch(`${x}/api/getPools`)
//   .then((res)=>{
//     //console.log(JSON.stringify(result,'',2));
//     return res.json();
//   })
//   .then((polls)=>{
//       console.log(polls);
//   })
//   .catch((err)=>{
//     console.log(err);
//   });