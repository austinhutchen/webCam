// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const secretJSON = JSON.parse( process.env.NEXT_PUBLIC_firebaseConfig)
// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: secretJSON.apiKey,
    authDomain: secretJSON.authDomain,
    databaseURL: secretJSON.databaseURL,
    projectId: secretJSON.projectId,
    storageBucket: secretJSON.storageBucket,
    messagingSenderId: secretJSON.messagingSenderId,
    appId: secretJSON.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
