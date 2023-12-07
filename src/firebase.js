import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDK5ayVVfjs7pJJUKrVRMpY3nn3OQVVErg",
  authDomain: "bloganduploaddocapp.firebaseapp.com",
  projectId: "bloganduploaddocapp",
  storageBucket: "bloganduploaddocapp.appspot.com",
  messagingSenderId: "89926046358",
  appId: "1:89926046358:web:00cf2173110c715870a8b7",
  measurementId: "G-S5JFXZPWSX"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);