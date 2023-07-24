import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "weatherzilla.firebaseapp.com",
  databaseURL: "https://weatherzilla-default-rtdb.firebaseio.com",
  projectId: "weatherzilla",
  storageBucket: "weatherzilla.appspot.com",
  messagingSenderId: "831862181120",
  appId: "1:831862181120:web:1d94917fcd963d061037e5",
  measurementId: "G-5TB4R3VBN6"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

