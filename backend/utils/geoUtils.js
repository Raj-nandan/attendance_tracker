// calculating distance between two points using Haversine formula
export const calculateDistance = (point1, point2) => {
  //   console.log(point1);

  if (
    !point1 ||
    !point2 ||
    !point1.latitude ||
    !point1.longitude ||
    !point2.latitude ||
    !point2.longitude
  ) {
    throw new Error("Both points must have latitude and longitude properties");
  }

  const R = 6371e3;
  const toRadians = (degree) => degree * (Math.PI / 180);

  const lat1 = toRadians(point1.latitude);
  const lat2 = toRadians(point2.latitude);
  const deltaLat = toRadians(point2.latitude - point1.latitude);
  const deltaLon = toRadians(point2.longitude - point1.longitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - 1));
  return R * c; // Distance in meters
};

// check if current location is outside the buildings' area
export const isOutsideBuildingArea = (
  buildingLocation,
  currentLocation,
  radius = 50
) => {
  const distance = calculateDistance(buildingLocation, currentLocation);
  return distance > radius; // Outside if the distance exceeds the radius (default: 50 meters)
};
