import { signOut } from "firebase/auth";
import { auth } from "./firebase-client";
import axios from "axios";

export const signOutUser = async () => {
    try {
      // 1️⃣ Sign out from Firebase
      await signOut(auth);

      // 2️⃣ Clear server-side session cookie
      await axios.post("/api/authentication/signout"); // API route deletes cookie
      console.log("User signed out successfully");

      // 3️⃣ Redirect to login page
      window.location.href = "/signin";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };