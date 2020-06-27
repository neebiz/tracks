import React, {useEffect, useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';

const LoadingScreen = () => {
  const {tryLocalSignin} = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  //this could be a loading screen used on app start up.  However we are using it just to check the state of the auth token
  //so it will be very fast to load.  Therefore it will be disorienting to the user if it flashes up quickly so return null at this point
  return null;
}

export default LoadingScreen;
