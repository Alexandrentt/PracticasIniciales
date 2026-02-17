import * as firebaseApp from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Credenciales actualizadas
const firebaseConfig = {
    apiKey: "AIzaSyBaspSyADUC6AITI_aCsS3N7bzaXvJrq1c",
    authDomain: "practicasiniciales-3020.firebaseapp.com",
    projectId: "practicasiniciales-3020",
    storageBucket: "practicasiniciales-3020.firebasestorage.app",
    messagingSenderId: "125250385712",
    appId: "1:125250385712:web:f5b549928f2d90c1047af5",
    measurementId: "G-EJYXG81H5P"
};

const app = firebaseApp.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);