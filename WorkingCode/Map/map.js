let userIds = [];



document.addEventListener('DOMContentLoaded', () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBxoV0Qji0j8GjG2N4jqYWWUtmUnN1Qyec",
    authDomain: "remember5-321e2.firebaseapp.com",
    projectId: "remember5-321e2",
    storageBucket: "remember5-321e2.appspot.com",
    messagingSenderId: "363183328287",
    appId: "1:363183328287:web:3f597b880859c5eb18192a",
    measurementId: "G-XPX3Y2K184"
  };

  firebase.initializeApp(firebaseConfig)
  const db = firebase.firestore()
  db.settings({});

  const auth = firebase.auth();

  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('User logged in: ', user);
    } else {
      console.log('User logged out');
    }
  })

  
    ID_Array();
  
});

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




async function ID_Array() {
  const db = firebase.firestore();

  const createAccountSnapshot = await db.collection("CreateAccount").get();


  if (!createAccountSnapshot.empty) {
    createAccountSnapshot.forEach((doc) => {
      const data = doc.data();
      const userID = data.ID;

      if (userID !== undefined) {

        userIds.push(userID);
      }
    });

  } else {
    console.log("No documents found in the CreateAccount collection.");
  }


}

window.onload

async function displayAddresses() {
  clearMarkers();
  

  const db = firebase.firestore();

  console.log(userIds.length);
  for(let i =0; i <userIds.length;i++){
    //console.log(userIds[i])
    const preferences = await db.collection(userIds[i]).doc('Preferences').get();

  if (preferences.exists) {
    const username = preferences.data().username;
    const address = preferences.data().address;
    console.log("Username: ",username)
    console.log("address: ",address)
  
    await geocodeAddress(address, username);
  } else {
    console.log('Preferences document does not exist');
  }
  }
  
 
}



async function geocodeAddress(address,name) {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`);
    const data = await response.json();


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
