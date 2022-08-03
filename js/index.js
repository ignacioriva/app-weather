const btnNav = document.getElementById('btnNav');
const btnClose = document.getElementById('btnClose');
const navResponsive = document.getElementById('navResponsive');
const btnSeach = document.getElementById('btnSeach');
const inputSeach = document.getElementById('inputSeach');
const tempNumber = document.getElementById('tempNumber');
const cityWheather = document.getElementById('cityWheather');
const wheatherDescription = document.getElementById('wheatherDescription');
const date = new Date();
const dateString = `Today ' ${date.toDateString().slice(0,-8)}, ${date.getDay()}`;
const dateInfo = document.getElementById('dateInfo').innerHTML = dateString;
const windStatus = document.getElementById('windNumber');
const humidityPorcent = document.getElementById('humidityPorcent');
const visibilityNumber = document.getElementById('visibilityNumber');
const airPressureNumber = document.getElementById('airPressureNumber');
let valueInput;

const fetchData = (location) => {

	const loction = location;

  return new Promise((resolve, reject) => (
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${loction}&key=b41e80f9ba614931be5f0ee7170eeeac`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
      ))
};

const weatherAPI = (lat,long) => {
	const a = lat;
	const b = long;
  return new Promise((resolve, reject) => (
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${a}&lon=${b}&exclude={part}&appid=bb53ccca89a7026be159aabf357646f9&units=metric`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
      ))
};

btnSeach.addEventListener('click', () => {
	valueInput = inputSeach.value;
	async function getData() {
	  const data = await fetchData(valueInput);
	  const lat = data.results[0].geometry.lat;
	  const long = data.results[0].geometry.lng;
	  const resp = await weatherAPI(lat,long);
	  tempNumber.innerHTML = `${Math.round(resp.current.temp)}<span>°c</span>`;
	  cityWheather.innerHTML = valueInput;
	  wheatherDescription.innerHTML = `${resp.current.weather[0].main}`;
	  windStatus.innerHTML = `${resp.current.wind_speed}mph`;
	  humidityPorcent.innerHTML = `${resp.current.humidity}%`;
	  visibilityNumber.innerHTML = `${resp.current.visibility}miles`;
	  airPressureNumber.innerHTML = `${resp.current.pressure}mb`;
	  console.log(resp);
	};

getData();

});

btnNav.addEventListener('click', () => {
	navResponsive.style.display = 'block';
});

btnClose.addEventListener('click', () => {
	navResponsive.style.display = 'none';
});