import * as Location from 'expo-location';

const tenMetresWithDegrees = 0.0001;

const getLocation = increment => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: -0.08394089691508552 + increment * tenMetresWithDegrees,
      latitude: 51.00614232033971 + increment * tenMetresWithDegrees
    }
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit('Expo.LocationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  });
  counter++;
}, 1000);
