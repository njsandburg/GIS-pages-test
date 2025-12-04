// Create the map centered roughly on San Diego
const map = L.map('map').setView([32.7157, -117.1611], 10);

// Add the base map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Load your local GeoJSON file (it must be in the same folder)
fetch('SDG_Indicator_6.3.2_Clean_Water_and_Sanitation_-_Tract_20251021.geojson')
  .then((response) => response.json())
  .then((data) => {
    L.geoJSON(data, {
      style: {
        color: 'blue',
        weight: 1,
        fillColor: 'skyblue',
        fillOpacity: 0.5,
      },
      onEachFeature: (feature, layer) => {
        const name = feature.properties.NAME || 'No name';
        layer.bindPopup(name);
      },
    }).addTo(map);
  })
  .catch((error) => console.error('Error loading GeoJSON:', error));
