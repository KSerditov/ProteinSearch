import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgwFmiZzi7wejk8yhpOXQ9T9ST58NEba8",
  authDomain: "ksprotauth.firebaseapp.com",
  projectId: "ksprotauth",
  storageBucket: "ksprotauth.appspot.com",
  messagingSenderId: "430140733022",
  appId: "1:430140733022:web:c83ed9c239dc6bdacbe6cf",
  measurementId: "G-VFEEYCG3H1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
