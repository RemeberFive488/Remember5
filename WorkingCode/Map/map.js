mapboxgl.accessToken = 'pk.eyJ1IjoicHJpbmNla2hyb25vcyIsImEiOiJjbGR5M2FjZXcwMWZwM25vOGRzZ2NyaGNtIn0.xuJooVDUksV_s8W29Jwu7w';
var map;
var markers = [];

function initMap() {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-76.7221, 40.1949],
    zoom: 13
  });
}

async function displayAddresses() {
  clearMarkers();
  await geocodeAddress("777 W Harrisburg Pike, Middletown, PA 17057","Sukmoon Blum");
  await geocodeAddress("277 W Main St, Middletown, PA 17057","Jeremy Chang");
}
async function geocodeAddress(address,name) {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`);
    const data = await response.json();

    // console.log(response)
    // console.log("---------------------------------")
    // console.log(data)

    if (data.features.length === 0) 
    {
      alert(`No results found for "${address}"`);
      return;
    }

    const [lng, lat] = data.features[0].center;
    map.setCenter([lng, lat]);

    var marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);

    markers.push(marker);
  
    marker.getElement().addEventListener('click', function() 
    {

      var popup = new mapboxgl.Popup({closeOnClick: false})
        .setLngLat([lng, lat])
        .setHTML(`<h3>Name: ${name}</h3><hr><h3>Address: ${address}</h3>`)
        .addTo(map);
      popup.addTo(map);

    });
  }
  
  

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].remove();
  }
  markers = [];
}
