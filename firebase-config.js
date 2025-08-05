<<<<<<< HEAD
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Correct Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD59G2HyQvJsp2aVP-qXT9B7csPRuT5wCY",
  authDomain: "rhythmtasks-b58b7.firebaseapp.com",
  projectId: "rhythmtasks-b58b7",
  storageBucket: "rhythmtasks-b58b7.firebasestorage.app",
  messagingSenderId: "382556143960",
  appId: "1:382556143960:web:d66e16a4e8097cd8f6652d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
=======
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Correct Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD59G2HyQvJsp2aVP-qXT9B7csPRuT5wCY",
  authDomain: "rhythmtasks-b58b7.firebaseapp.com",
  projectId: "rhythmtasks-b58b7",
  storageBucket: "rhythmtasks-b58b7.appspot.com", // FIXED
  messagingSenderId: "382556143960",
  appId: "1:382556143960:web:b128a4b86fec51b8f6652d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
>>>>>>> 8557c6ac5418f44e0589173bffaafde5c1bf8bda
