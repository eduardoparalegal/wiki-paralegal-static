// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW4Nrvz8TXu6gdsGuOpmNKexmNoZ75uv0",
  authDomain: "base-de-datos-de-cliente-71302.firebaseapp.com",
  projectId: "base-de-datos-de-cliente-71302",
  storageBucket: "base-de-datos-de-cliente-71302.firebasestorage.app",
  messagingSenderId: "532728219495",
  appId: "1:532728219495:web:bce1f335da96be930ad1c2",
  measurementId: "G-Y1M6QJ30B9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Colección de clientes
const clientsCollection = collection(db, "clients");

// Exportar funciones de Firestore
export {
  db,
  clientsCollection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc
};