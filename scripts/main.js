// Set api token
mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fyb2xpczk5MDYiLCJhIjoiY2ticm9kNWI1MjBldTJxcG85YW52dmhqdSJ9.T74sbdUD0CFCZJ3Y_0a99g';

// location data
var landingSpots = [
	{
		name: 'Landing site A',
		location: {lat: 28.472313,lng: -80.563803},
		BaseName: 'Cape Canaveral Air Force Station'
	}, {
		name: 'Landing site B',
		location: {lat: 31.483000, lng: -87.330550},
		BaseName: 'Columbus Air Force Base'
	}, {
		name: 'Landing site C',
		location: {lat: 43.047960,lng: -115.836520},
		BaseName: 'Mountain Home Air Force Base'
	}
];


// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',

  // Positioning the map on a certain longitute + latitude and zooming in
  center: [-101.609778, 38.272689],
  zoom: 3,
});

// Voeg location search
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  }),
  'bottom-left'
);


for(var i=0; i< landingSpots.length; i++){
	var myCustomMarker = document.createElement('div');
	myCustomMarker.className = 'customMarker';
	myCustomMarker.innerHTML = landingSpots[i].name; 
	myCustomMarker.style.cursor = 'pointer';

// 	myCustomMarker.addEventListener('click', function() {
//   	myCustomMarker.innerHTML = landingSpots[i].name + <br> + landingSpots[i].BaseName;
// })

	// Adding a marker based on lon lat coordinates
	var marker = new mapboxgl
	.Marker(myCustomMarker)
	.setLngLat([landingSpots[i].location.lng, landingSpots[i].location.lat])
	.addTo(map);
}









function getAPIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='520afdfcd89c6228ea0577442687a35b';
	var city = document.getElementById('city').value;

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISucces(response);	
	})
	
	// catch error
	.catch(function (error) {
		onAPIError(error);
	});
}


function onAPISucces(response) {
	// get type of weather in string format
	var type = response.weather[0].description;

	// get temperature in Celcius
	var degC = Math.floor(response.main.temp - 273.15);
	var windZ = Math.floor(response.wind.speed)

	// render weather in DOM
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = degC + '&#176;C <br>' + windZ + 'm/s <br>' + type +'<br>'+ response.name;
	console.log(response);
}

function onAPIError(error) {
	console.error('Fetch request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = 'No weather data available <br /> Did you enter a valid city?'; 
}

// init data stream
document.getElementById('getWeather').onclick = function(){
	getAPIdata();
};