// The Google Maps <script> tag defines "google.maps"
console.log("Google Maps JavaScript", google.maps);

const mapDiv = document.querySelector(".my-google-map");
const locationInput = document.querySelector(".location-input");

if (mapDiv) {
  drawMap();
  getUserLocation();
}

if (locationInput) {
  startAutocomplete();
}


// Functions
// -----------------------------------------------------------------------------
function drawMap() {
  // map without "var" or "const" to make it GLOBAL
  map = new google.maps.Map(mapDiv, {
    zoom: 10,
    center: new google.maps.LatLng(18.3894, -66.1305),
    // center: {
    //   lat: 18.3894,
    //   lng: -66.1305,
    // },
  });

  new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(18.3894, -66.1305),
    title: "San Juan, Puerto Rico",
    animation: google.maps.Animation.DROP,
  });

  new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(18.406, -66.01595),
    title: "Carolina, Puerto Rico (birthplace of reggaeton)",
    animation: google.maps.Animation.DROP,
  });
}

function getUserLocation () {
  navigator.geolocation.getCurrentPosition(result => {
    console.log("User's LOCATION", result);

    const { latitude, longitude } = result.coords;

    // move the map to the user's location
    map.setCenter(new google.maps.LatLng(latitude, longitude));
    map.setZoom(12);

    // drop a marker on the user's location
    new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(latitude, longitude),
      title: "You Are Here",
      animation: google.maps.Animation.DROP,
    });
  });
}

function startAutocomplete() {
  const myComplete = new google.maps.places.Autocomplete(locationInput);

  myComplete.addListener("place_changed", () => {
    const userSelection = myComplete.getPlace();
    console.log("User clicked on a SUGGESTION", userSelection);

    const latInput = document.querySelector(".lat-input");
    const longInput = document.querySelector(".long-input");
    const placeIdInput = document.querySelector(".place-id-input");

    // set the values in the form inputs
    const loc = userSelection.geometry.location;
    latInput.value = loc.lat();
    longInput.value = loc.lng();
    placeIdInput.value = userSelection.place_id;
  });
}
