import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvoMoRV9isUUtLkxT5Fwxcd7tmZD_CvPs",
  authDomain: "practice-project-3-52b87.firebaseapp.com",
  projectId: "practice-project-3-52b87",
  storageBucket: "practice-project-3-52b87.firebasestorage.app",
  messagingSenderId: "920305093798",
  appId: "1:920305093798:web:554f749aba0596f4aab867",
  measurementId: "G-L2DL08KCKH",
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; // Named export