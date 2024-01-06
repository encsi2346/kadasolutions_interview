import 'firebase/analytics';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIkrl_wyO_MZ0dssUHOsTwiGm2fXhPTAI",
    authDomain: "kadasolutions-interview-50bf6.firebaseapp.com",
    projectId: "kadasolutions-interview-50bf6",
    storageBucket: "kadasolutions-interview-50bf6.appspot.com",
    messagingSenderId: "792186666755",
    appId: "1:792186666755:web:d6fd5313315d476af3f336"
};

// Initialize Firebase
const FireBase = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(FireBase);
export const db = getFirestore(FireBase);