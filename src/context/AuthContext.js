import {AsyncStorage} from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import {navigate} from '../navigationRef';

const authReducer = (state, action) => {

  switch (action.type) {
    //same return so handles both sign in and sign up
    case 'signin':
      return {errorMessage: '', token: action.payload}
    case 'add_error':
      //takes all the values of state and puts them in a new object.  then updates the error message property with what's in action.payload.  We never update state direectly in a reducer
      return {...state, errorMessage: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {token: null, errorMessage: ''};
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async() => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({type: 'siginin', payload: token});
    navigate('TrackList');
  } else {
    navigate('Signup');
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message'});
};

//inner function that is called from screen
const signup = (dispatch) => {
  return async ({email, password}) => {
    try {
      //make api request to sign up with the email and password
      const response = await trackerApi.post('/signup', {email, password});

      //if we sign up modify our state and say that we are autthenticated
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({type: 'signin', payload: response.data.token});

      //all looks good navigate to the main flow
      navigate('TrackList');
    }
    catch (err) {
      //if signup fails we need to handle the errors
      dispatch({type: 'add_error', payload: 'Something went wrong with sign up.'});
      console.log(err.message);
    }
  };
};

const signin = (dispatch) => {
  return async ({email, password}) => {
    try {
      //make api request to sign in with the email and password
      const response = await trackerApi.post('/signin', {email, password});

      //if we sign in modify our state and say that we are autthenticated
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({type: 'signin', payload: response.data.token});

      //all looks good navigate to the main flow
      navigate('TrackList');
    }
    catch (err) {
      //if signin fails we need to handle the errors
      dispatch({type: 'add_error', payload: 'Something went wrong with sign in.'});
    }
  };
};


const signout = (dispatch) => {
  return async() => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});
    navigate('loginFlow');
  };
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup, clearErrorMessage, tryLocalSignin},
  {token: null, errorMessage: ''}
);
