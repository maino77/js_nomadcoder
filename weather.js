const weather = document.querySelector(".js-weather");

// AP는 다른 서버로부터 손쉽게 데이터를 가져올 수 있는 수단이다.
const API_KEY = "9730934379c4806648360d3cc00d8894"
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
    //then을 사용한 이유는 fetch가 완료되길 기다려야하기 때문이다.
    // 그렇지 않으면 fetch가 정삭적으로 작동하지 않을 수 있다.
    //js에서 무언가 끝나기 기다리는 방법은 then을 사용하는 것이다.
}

//위치 정보를 불러오는 코드
    function saveCoords(coordsObj){
        //저장값은 string이여야 하기  때문에 json사용
        localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    }
    // 위도와 경도를 가져오는 함수
    function handleGeoSucces(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coordsObj = {
            //키와 value값이 같다면
            // latitude, longitude
            // 이렇게 나타낼 수 있다.
            latitude: latitude,
            longitude: longitude
        };
        saveCoords(coordsObj);
        getWeather(latitude, longitude)
    }

    function handleGeoError(){
        console.log('Can`t access geo location');
    }

    function askForCoords(){
        //geolocation은 객체이며 getCurrentPostion을 사용할 것이다.
        //getCurrentPosition는 두 개의 요소가 필요하며
        //첫 번째는 좌표를 가져오는데 성공했을 때 처리하는 함수다.
        //두 번째는 실패했을 때 처리할 함수다.    
        navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
    }

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();

}

init();