import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyD9bILGUFkMuHJHdSU1oQ2D3DPZzVPbymk",
  authDomain: "angularcam.firebaseapp.com",
  databaseURL: "https://angularcam-default-rtdb.firebaseio.com",
  projectId: "angularcam",
  storageBucket: "angularcam.appspot.com",
  messagingSenderId: "683800012934",
  appId: "1:683800012934:web:66646383dcd40c9b770907",
  measurementId: "G-1VL876XTKN"
};// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
