// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC_WA1YSin-B-MIl6pgqycft-upEnsjgJY",
  authDomain: "datablobstore.firebaseapp.com",
  databaseURL: "https://datablobstore-default-rtdb.firebaseio.com",
  projectId: "datablobstore",
  storageBucket: "datablobstore.appspot.com",
  messagingSenderId: "940269214197",
  appId: "1:940269214197:web:4bea4491c732506f4168bc",
  measurementId: "G-FFN99SQM4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
