// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const secretJSON = JSON.parse( process.env.NEXT_PUBLIC_firebaseConfig)
// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: secretJSON.NEXT_PUBLIC_apiKey,
    authDomain: secretJSON.NEXT_PUBLIC_authDomain,
    databaseURL: secretJSON.NEXT_PUBLIC_databaseURL,
    projectId: secretJSON.NEXT_PUBLIC_projectId,
    storageBucket: secretJSON.NEXT_PUBLIC_storageBucket,
    messagingSenderId: secretJSON.NEXT_PUBLIC_messagingSenderId,
    appId: secretJSON.NEXT_PUBLIC_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
