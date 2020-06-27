import {useState, useEffect} from 'react';
import {Accuracy, requestPermissionsAsync, watchPositionAsync} from 'expo-location';

export default (shouldTrack, callback) => {

  const [err, setErr] = useState(null);
  const [subscriber, setSubscriber] = useState(null);

  useEffect(() => {

    const startWatching = async() => {
      try {
        await requestPermissionsAsync();
        const sub = await watchPositionAsync({
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        }, location => {
          console.log('checking location.......');
          callback(location)
        });
        setSubscriber(sub);
      }
      catch (e) {
        console.log(e);
        setErr(e);
      }
    };

    if(shouldTrack) {
      startWatching();
    } else {
      subscriber.remove();
      setSubscriber(null);
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);
  //we add these list of dependencies so that the effect only runs again if the actual memory reference to them changes not just the value
  return [err];
};
