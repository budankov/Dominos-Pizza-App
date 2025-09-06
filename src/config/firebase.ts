import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBoK9qUQMtbFQ5XXFetwytAao-nQ0rN5iU",
  authDomain: "dominos-pizza-app-6b746.firebaseapp.com",
  projectId: "dominos-pizza-app-6b746",
  storageBucket: "dominos-pizza-app-6b746.firebasestorage.app",
  messagingSenderId: "321565001940",
  appId: "1:321565001940:web:181340d841b35e98501341",
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
