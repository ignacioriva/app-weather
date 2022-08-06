/// VARIABLES ////
const btnNav = document.getElementById('btnNav');
const btnClose = document.getElementById('btnClose');
const navResponsive = document.getElementById('navResponsive');
const btnSeach = document.getElementById('btnSeach');
const btnLocation = document.getElementById('btnLocation');

//// FUNCTION SET DATE /////
function setDate () {
	const date = new Date();
	const dateString = `Today ' ${date.toDateString().slice(0,-8)}, ${date.getDay()}`;
	const dateInfo = document.getElementById('dateInfo').innerHTML = dateString;
}setDate();

btnSeach.addEventListener('click', () => {
	const inputSeach = document.getElementById('inputSeach');
	let valueInput = inputSeach.value;
	async function getData() {
	  const data = await fetchData(valueInput);
	  const lat = data.results[0].geometry.lat;
	  const long = data.results[0].geometry.lng;
	  const resp = await weatherAPI(lat,long);
	  setValuesWeather(resp);
	  console.log(resp);
	};

getData();

});
//// FUNCTION SET ALL VALUES WEATHER /////
function setValuesWeather (obj) {
  const tempNumber = document.getElementById('tempNumber');
  const cityWheather = document.getElementById('cityWheather');
  const wheatherDescription = document.getElementById('wheatherDescription');
  const windStatus = document.getElementById('windNumber');
  const humidityPorcent = document.getElementById('humidityPorcent');
  const visibilityNumber = document.getElementById('visibilityNumber');
  const airPressureNumber = document.getElementById('airPressureNumber');

  tempNumber.innerHTML = `${Math.round(obj.current.temp)}<span>°c</span>`;
  cityWheather.innerHTML = obj.timezone;
  wheatherDescription.innerHTML = `${obj.current.weather[0].main}`;
  windStatus.innerHTML = `${obj.current.wind_speed}mph`;
  humidityPorcent.innerHTML = `${obj.current.humidity}%`;
  visibilityNumber.innerHTML = `${obj.current.visibility}miles`;
  airPressureNumber.innerHTML = `${obj.current.pressure}mb`;

  const dailyDivMax = document.getElementsByClassName('weekTempMax');
  const dailyDivMin = document.getElementsByClassName('weekTempMin');

  for (let i = 0; i < 5; i++){
  	dailyDivMax[i].innerHTML = `${Math.round(obj.daily[i].temp.max)}°c`;
  	dailyDivMin[i].innerHTML = `${Math.round(obj.daily[i].temp.min)}°c`;
  }
}

btnNav.addEventListener('click', () => {
	navResponsive.style.display = 'block';
});

btnClose.addEventListener('click', () => {
	navResponsive.style.display = 'none';
});

btnLocation.addEventListener('click', () => {
	navigator.geolocation.getCurrentPosition(async function(position) {
  		const obj = await weatherAPI(position.coords.latitude, position.coords.longitude);
  		setValuesWeather(obj);
  		console.log(obj);
	});
});
///// API OPENCAGE ////
const fetchData = (location) => {
  return new Promise((resolve, reject) => (
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=b41e80f9ba614931be5f0ee7170eeeac`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
      ))
};
///// API OPENWEATHER ////
const weatherAPI = (lat,long) => {
  return new Promise((resolve, reject) => (
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=bb53ccca89a7026be159aabf357646f9&units=metric`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
      ))
};
