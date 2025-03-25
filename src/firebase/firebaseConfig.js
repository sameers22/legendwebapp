// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDBKO1dk507uag79m2gB7pHXv0V06dL_KE",
    authDomain: "legend-e3a70.firebaseapp.com",
    projectId: "legend-e3a70",
    storageBucket: "legend-e3a70.firebasestorage.app",
    messagingSenderId: "642835683587",
    appId: "1:642835683587:web:11036cea0541b30d54f136",
    measurementId: "G-KS5NKM03L4"
  };

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
export default app;
