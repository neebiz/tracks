import React, {useContext } from 'react';
import {View, StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {NavigationEvents} from 'react-navigation';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({navigation}) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  console.log(state);
  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => {clearErrorMessage()}} //can also just pass in clearErrorMessage rather than the arrow function
      />
      <AuthForm
        headerText='Sign Up for Tracker'
        errorMessage={state.errorMessage}
        submitButtonText='Sign Up'
        onSubmit={signup}
      />

      <NavLink
        routeName='Signin'
        text='Already have an account? Sign in instead.'
      />


    </View>
  );
};

SignupScreen.navigationOptions = () => {
    return {
      header: null
    };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200
  }
});

export default SignupScreen;
