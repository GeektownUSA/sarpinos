export async function geocode(address) {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${globalThis.NEXT_PUBLIC_GOOGLEMAPS_API_KEY ?? (process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY)}`);
  const data = await response.json();

  if (data.status !== 'OK') {
    throw new Error(`Failed to geocode address: ${data.status}`);
  }

  const { lat, lng } = data.results[0].geometry.location;

  return { lat, lng };
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

export function calculateDistance(coord1, coord2) {
  const R = 6371e3; // Earth's radius in meters
  const lat1 = toRadians(coord1.lat);
  const lat2 = toRadians(coord2.lat);
  const deltaLat = toRadians(coord2.lat - coord1.lat);
  const deltaLng = toRadians(coord2.lng - coord1.lng);

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}
