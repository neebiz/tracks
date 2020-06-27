import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';
import SafeAreaView from 'react-navigation';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';

const AccountScreen = () => {

  const {signout} = useContext(AuthContext);
  return  (
    //this tag stops the component rendering behind the time and network carrier etc.
    <View>
      <Text>Account Screen</Text>
      <Spacer>
        <Button title={'Sign out'} onPress={signout} />
      </Spacer>
    </View>
  );
}

const styles = StyleSheet.create({});

export default AccountScreen;
