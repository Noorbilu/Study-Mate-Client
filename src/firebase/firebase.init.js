// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeEiKfioZuDaixD_Y2xsN5n4Kgj7XTvkI",
  authDomain: "study-mate-81a3e.firebaseapp.com",
  projectId: "study-mate-81a3e",
  storageBucket: "study-mate-81a3e.firebasestorage.app",
  messagingSenderId: "236887988349",
  appId: "1:236887988349:web:8431e5e9edddb2e724b914"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;