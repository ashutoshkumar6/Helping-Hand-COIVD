
mapboxgl.accessToken = 'pk.eyJ1IjoiYXNodXRvc2hrdW1hcjYiLCJhIjoiY2tqaDY3Y2ZmMHltMzM3bnY3MXlvZXVtcCJ9.ErjUQ9LZNrhKpqTtTJzR0w';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [80.33111, 26.4725],
zoom: 10
});

var geocoder = new MapboxGeocoder({ // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: true, // Use the default marker style
    placeholder: 'Search for places in Kanpur', // Placeholder text for the search bar
    bbox: [80.1158526594972, 26.18205430711, 80.5538117327514, 26.6400085677318], // Boundary for Berkeley
    proximity: {
      longitude: 80.33111,
      latitude: 26.4725
    } // Coordinates of Kanpur
    });
    
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
map.addControl(new mapboxgl.NavigationControl());

// After the map style has loaded on the page,

map.on('load', function() {
  // Listen for the `result` event from the Geocoder
  // `result` event is triggered when a user makes a selection
  // Add a marker at the result's coordinates
  geocoder.on('result', function(ev) {
    var lon = ev.result.geometry.coordinates[0]
    var lat = ev.result.geometry.coordinates[1]
    document.querySelector('#lon').value = lon
    document.querySelector('#lat').value = lat
    document.querySelector('#place_name').value = ev.result.text
    // console.log(typeof(lon))
    // console.log(typeof(lat))
    console.log(ev.result.text)

    // create DOM element for the marker
    var el = document.createElement('div');
    el.id = 'marker';

    // create the marker
    new mapboxgl.Popup()
        .setLngLat(ev.result.geometry.coordinates.slice())
        .setHTML(ev.result.text)
        .addTo(map);
    });
});