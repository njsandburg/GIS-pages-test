// Create the map centered roughly on San Diego
const map = L.map('map').setView([32.7157, -117.1611], 10);

// Add the base map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);
function getFeatureStyle(feature) {
    const value = feature.properties["drinking_water_percentile"];

  // normalize value to a number
  const v = (value === null || value === undefined) ? NaN : Number(value);

  function getColor(n) {
    if (isNaN(n)) return '#cccccc'; // gray for unknown / missing
    // Classes: 9-20, 20-36, 36-49, 49-61, 61-95
    // Sequential blue palette (light -> dark)
    if (n <= 20) return '#deebf7';
    if (n <= 36) return '#9ecae1';
    if (n <= 49) return '#6baed6';
    if (n <= 61) return '#3182bd';
    return '#08519c';
  }

  return {
    fillColor: getColor(v),
    weight: 1,
    opacity: 1,
    color: "#666",
    fillOpacity: 0.7,
  };
}

// Load your local GeoJSON file (it must be in the same folder)
fetch('SDG_Indicator_6.3.2_Clean_Water_and_Sanitation_-_Tract_20251021.geojson')
  .then((response) => response.json())
  .then((data) => {
    L.geoJSON(data, {
      style: getFeatureStyle,
        
      onEachFeature: (feature, layer) => {
        const name = feature.properties.NAME || 'No name';
        layer.bindPopup(name);
      },
    }).addTo(map);
  })
  .catch((error) => console.error('Error loading GeoJSON:', error));
