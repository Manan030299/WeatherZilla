import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  // apiKey: 'AIzaSyAbPs0ceeqehkUthLCt659vfBuK2FaJxiQ',
  authDomain: 'weatherzilla-290a9.firebaseapp.com',
  databaseURL: 'https://weatherzilla-290a9-default-rtdb.firebaseio.com',
  projectId: 'weatherzilla-290a9',
  storageBucket: 'weatherzilla-290a9.appspot.com',
  messagingSenderId: '376543401685',
  appId: '1:376543401685:web:1666171cdf87eda631745c',
  measurementId: 'G-EYFCMH0VXH',
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider;

