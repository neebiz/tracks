import React, {useState} from 'react';
import {Text, Button, Input} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import Spacer from './Spacer';

const AuthForm = ({headerText, errorMessage, onSubmit, submitButtonText}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
        <Input
          label='Email'
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize='none'
        />
      <Spacer/>
        <Input
          label='Password'
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize='none'
          secureTextEntry={true}
        />
      <Spacer>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        <Button title={submitButtonText} onPress={() => onSubmit({email, password})} />
      </Spacer>
    </>
  );


}

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginBottom: 5,
    marginLeft: 2
  }
});

export default AuthForm;
