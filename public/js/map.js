mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: schoolLocation.geometry.coordinates,
  zoom: 10,
});

const marker = new mapboxgl.Marker({
  color: "#FF5733", //change the color of the marker
})
  .setLngLat(schoolLocation.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${schoolLocation.title}</h3><h3>${schoolLocation.location}</h3>`
    )
  )
  .addTo(map);
