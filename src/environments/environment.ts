// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: process.NEXT_PUBLIC_VERCEL_ENV.NEXT_PUBLIC_apiKey,
    authDomain: process.NEXT_PUBLIC_VERCEL_ENV.NEXT_PUBLIC_authDomain,
    databaseURL: process.NEXT_PUBLIC_VERCEL_ENV.NEXT_PUBLIC_databaseURL,
    projectId: process.NEXT_PUBLIC_VERCEL_ENV.NEXT_PUBLIC_projectId,
    storageBucket: process.NEXT_PUBLIC_VERCEL_ENV.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.NEXT_PUBLIC_VERCEL_ENV.NEXT_PUBLIC_messagingSenderId,
    appId: process.NEXT_PUBLIC_VERCEL_ENV.NEXT_PUBLIC_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
