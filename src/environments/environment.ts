import { initializeApp } from "firebase/app";

export  const environment={
production: false,
 firebaseConfig :{
  apiKey: "AIzaSyC_WA1YSin-B-MIl6pgqycft-upEnsjgJY",
  authDomain: "datablobstore.firebaseapp.com",
  projectId: "datablobstore",
  storageBucket: "datablobstore.appspot.com",
  messagingSenderId: "940269214197",
  appId: "1:940269214197:web:4bea4491c732506f4168bc"
},
}
const app = initializeApp(environment.firebaseConfig);
