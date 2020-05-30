const toRadians = (location) => {
  return {
    lat: (location.lat * Math.PI) / 180,
    long: (location.long * Math.PI) / 180,
  };
};

export default class Haversine {
  constructor(firstLocation, secondLocation) {
    firstLocation = toRadians(firstLocation);
    secondLocation = toRadians(secondLocation);

    const earthRay = 6371e3;
    const deltaLat = secondLocation.lat - firstLocation.lat;
    const deltaLong = secondLocation.long - firstLocation.long;

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(firstLocation.lat) *
        Math.cos(secondLocation.lat) *
        Math.sin(deltaLong / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = earthRay * c;

    this.distance = Math.round(d);
  }

  isNear(meters) {
    return this.distance <= meters;
  }
}
