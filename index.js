// index.js
import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// ELEMENT SELECTORS
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const forgotPasswordLink = document.getElementById('forgot-password');

// ------------------- LOGIN -------------------
loginBtn?.addEventListener('click', async () => {
  const email = document.getElementById('login-email')?.value.trim();
  const password = document.getElementById('login-password')?.value.trim();

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user.emailVerified) {
      window.location.href = 'dashboard.html';
    } else {
      alert('Please verify your email before logging in.');
      await auth.signOut();
    }
  } catch (error) {
    console.error(error);
    alert('Login failed: ' + error.message);
  }
});

// ------------------- SIGN UP -------------------
signupBtn?.addEventListener('click', async () => {
  const email = document.getElementById('signup-email')?.value.trim();
  const password = document.getElementById('signup-password')?.value.trim();
  const confirmPassword = document.getElementById('signup-password-confirm')?.value.trim();

  if (!email || !password || !confirmPassword) {
    alert('Please fill in all sign-up fields.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);
    alert('Sign-up successful! A verification email has been sent. Please check your inbox and verify your email.');

    await auth.signOut(); // Prevent access until verified
  } catch (error) {
    console.error(error);
    alert('Sign-up failed: ' + error.message);
  }
});

// ------------------- FORGOT PASSWORD -------------------
forgotPasswordLink?.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = prompt("Enter your email to receive a password reset link:");
  if (!email) return;

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent!");
  } catch (error) {
    console.error(error);
    alert("Error: " + error.message);
  }
});

// ------------------- AUTO REDIRECT IF LOGGED IN -------------------
onAuthStateChanged(auth, (user) => {
  if (user && user.emailVerified && window.location.pathname.includes('index.html')) {
    window.location.href = 'dashboard.html';
  }
});
