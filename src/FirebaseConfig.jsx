// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhriv_Y6PE6w_zYvmYOBlm307KX0_SIfA",
  authDomain: "second-todo-app-c422e.firebaseapp.com",
  databaseURL: "https://second-todo-app-c422e-default-rtdb.firebaseio.com",
  projectId: "second-todo-app-c422e",
  storageBucket: "second-todo-app-c422e.firebasestorage.app",
  messagingSenderId: "439880955154",
  appId: "1:439880955154:web:5260408dae9575b6532fcb",
  measurementId: "G-HH5R19FJB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig