const weather = document.querySelector(".js-weather");

const API_KEY = "0cd596948880a60de004fce7c739d6dc";
const COORDS = "coords";

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        )
        .then(function(response){
           return response.json();
        })
        .then(function(json){
             const temperature = json.main.temp;
             const place = json.name;
             weather.innerText = `${temperature} @${place}`;
        });
//then()은 데이터가 완전히 들어온 다음 호출 
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude ,
        longitude : longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Can't access geo location!! ");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        //getWeather
        const parseCoords = JSON.parse(loadedCoords);
       // console.log(parseCoords);
       getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();