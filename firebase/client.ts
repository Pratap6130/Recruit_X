// lib/firebase/client.ts
"use client";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "recruitx-cb6f8.firebaseapp.com",
  projectId: "recruitx-cb6f8",
  storageBucket: "recruitx-cb6f8.firebasestorage.app",
  messagingSenderId: "164710733462",
  appId: "1:164710733462:web:384af5e9c2949f38b254b7",
  measurementId: "G-K97HHXM98C"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);