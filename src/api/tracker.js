import axios from 'axios';
import {AsyncStorage} from 'react-native';

 const instance = axios.create({
   baseURL: 'http://e44e92bbac90.ngrok.io'
 });

//allows us to auth before making requests to back end
instance.interceptors.request.use(
  //first function is called upon the request, second is called if there is an error
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`here is the token ${token}`);
    }
    return token;
  },
  (err) => {
    console.log('here is an error');
    return Promise.reject(err);
  }
);

export default instance;
