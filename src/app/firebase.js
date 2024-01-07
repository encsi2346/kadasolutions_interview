import 'firebase/analytics';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAIkrl_wyO_MZ0dssUHOsTwiGm2fXhPTAI",
    authDomain: "kadasolutions-interview-50bf6.firebaseapp.com",
    projectId: "kadasolutions-interview-50bf6",
    storageBucket: "kadasolutions-interview-50bf6.appspot.com",
    messagingSenderId: "792186666755",
    appId: "1:792186666755:web:f396ac25cf9430aaf3f336",
    databaseURL: "https://kadasolutions-interview-50bf6-default-rtdb.europe-west1.firebasedatabase.app",
    returnSecureToken: true,
};

const FireBase = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(FireBase);
export const db = getFirestore(FireBase);