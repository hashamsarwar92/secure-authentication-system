
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase-client";
import axios from "axios";

export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    console.log("User signed in:", user);
    // Get ID token
    const token = await user.getIdToken(true);
    await axios.post("/api/authentication/session", { token });

    // Send token to backend
    // await axios.post("/api/session", { token });
    // console.log("Session cookie set in backend");

    // Redirect
    // window.location.href = "/dashboard";
    if (!user.emailVerified) {
      await sendEmailVerification(user);
      console.log("Email verification sent to:", user.email);
    }

    return userCredential;
  } catch (error) {
    console.error("Firebase sign-in error:", error);
    throw error; // IMPORTANT
  }
};
