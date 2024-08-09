// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3ateZboUdEuutAxIu_qA3ualnRC0HWlU",
  authDomain: "easyjobs-812ee.firebaseapp.com",
  projectId: "easyjobs-812ee",
  storageBucket: "easyjobs-812ee.appspot.com",
  messagingSenderId: "292372363334",
  appId: "1:292372363334:web:927ccae2a1c2090446f247",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
