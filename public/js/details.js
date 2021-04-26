mapboxgl.accessToken = 'pk.eyJ1IjoiYXNodXRvc2hrdW1hcjYiLCJhIjoiY2tqaDY3Y2ZmMHltMzM3bnY3MXlvZXVtcCJ9.ErjUQ9LZNrhKpqTtTJzR0w';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [80.33111, 26.4725],
zoom: 10
}); 
map.addControl(new mapboxgl.NavigationControl());

async function getEvent() {
    const res=await fetch('/detail');
    const data=await res.json();
    const value=data.map(eve=>{
        return {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [eve.location.coordinates[0],eve.location.coordinates[1]]
                    },
                    properties: {
                      title: eve.event_name,
                      description: eve.event_organizer,
                      // c_name: '{{ e.event_type|lower }}'
                    }
            }
    })

    loadMap(value)
}


function loadMap(value){
    map.on('load', function () {
        map.loadImage(
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
        function (error, image) {
        if (error) throw error;
        map.addImage('cat', image);
        map.addSource('point', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': value
        }
        });
        map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'point',
        'layout': {
        'icon-image': 'cat',
        'icon-size': 0.09
        }
        });
        }
        );
        });
}

getEvent();



$(document).ready(function() {
    $('#map-toggler').click(function() {
      var $this = $(this);
      $('#map-container').toggle('blind', 1000);

      $this.toggleClass('hidden');
      if($this.hasClass('hidden'))
        $this.html('Show on Map');
      else
        $this.html('Hide Map');
    });
  });