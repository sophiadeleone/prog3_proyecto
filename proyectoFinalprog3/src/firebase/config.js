import app from "firebase/app"
import firebase from "firebase"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMzd8lSt0-A58CnJgenj20YX9AykgnHWI",
  authDomain: "progra3f.firebaseapp.com",
  projectId: "progra3f",
  storageBucket: "progra3f.firebasestorage.app",
  messagingSenderId: "54288035159",
  appId: "1:54288035159:web:8c856af8c4f6ba57986212"
};
app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()





/** FIREBASE SOPHIE. 
import app from "firebase/app"
import firebase from "firebase"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiZ6Pvv5vp_DS5DavB6fdpQOaF7IEsk_E",
  authDomain: "fir-1-687fb.firebaseapp.com",
  projectId: "fir-1-687fb",
  storageBucket: "fir-1-687fb.firebasestorage.app",
  messagingSenderId: "455876986767",
  appId: "1:455876986767:web:2521657a0c867fe6a0adfa"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()
*/