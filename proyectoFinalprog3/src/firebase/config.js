import app from "firebase/app"
import firebase from "firebase"

 //Your web app's Firebase configuration
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


/** codigo prueba sophie
import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDHeYBz0AwwgaBppGoDrhwiFULbPTBuO3Q",
  authDomain: "prog3firebase.firebaseapp.com",
  projectId: "prog3firebase",
  storageBucket: "prog3firebase.firebasestorage.app",
  messagingSenderId: "379761658376",
  appId: "1:379761658376:web:2d18004d47ce9d53a49fbd"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
 */


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDHeYBz0AwwgaBppGoDrhwiFULbPTBuO3Q",
//   authDomain: "prog3firebase.firebaseapp.com",
//   projectId: "prog3firebase",
//   storageBucket: "prog3firebase.firebasestorage.app",
//   messagingSenderId: "379761658376",
//   appId: "1:379761658376:web:2d18004d47ce9d53a49fbd"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


