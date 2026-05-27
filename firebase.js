import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYYodg5weFvpToqEYtqsEcFC48_QxeEA8",
  authDomain: "giveads.firebaseapp.com",
  projectId: "giveads",
  storageBucket: "giveads.firebasestorage.app",
  messagingSenderId: "710235750008",
  appId: "1:710235750008:web:54fcf29efe34accfb3f78d",
  measurementId: "G-BWX8XBT071"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);