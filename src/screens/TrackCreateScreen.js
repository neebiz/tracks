//import '../_mockLocation';
import React, {useContext, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Map from '../components/Map';
import {SafeAreaView, NavigationEvents, withNavigationFocus} from 'react-navigation';
import {Context as LocationContext} from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = ({isFocused}) => {

  console.log(isFocused);
  const {state: {recording}, addLocation} = useContext(LocationContext);
//using this means is only gets rerun again if the recording reference changes
  const callback = useCallback(location => {
    addLocation(location, recording);
  }, [recording]);
  const [err] = useLocation(isFocused || recording, callback);


  return (
    <View style={styles.container}>
      <Text h2>Create a track</Text>
      <Map />
      {err ? <Text>Please enable location services.</Text>: null}
      <TrackForm />
    </View>
  );
}

//alternative method for detecting focus
//<NavigationEvents onWillBlur={() => console.log('leaving')}/>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default withNavigationFocus(TrackCreateScreen);
