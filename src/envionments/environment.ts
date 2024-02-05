// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const environment = {
firebaseConfig : {
  apiKey: "AIzaSyC_WA1YSin-B-MIl6pgqycft-upEnsjgJY",
  authDomain: "datablobstore.firebaseapp.com",
  databaseURL: "https://datablobstore-default-rtdb.firebaseio.com",
  projectId: "datablobstore",
  storageBucket: "datablobstore.appspot.com",
  messagingSenderId: "940269214197",
  appId: "1:940269214197:web:4bea4491c732506f4168bc"
},
};

// Initialize Firebase
const app = initializeApp(envrionment.firebaseConfig);
