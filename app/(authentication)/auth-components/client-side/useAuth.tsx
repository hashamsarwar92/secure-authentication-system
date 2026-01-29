import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase-client";
import axios from "axios";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // Force refresh token to ensure server cookie is up to date
          const token = await currentUser.getIdToken(true);
          await axios.post("/api/authentication/session", { token });
          console.log("Session cookie set in backend");
        } else {
          await axios.post("/api/authentication/signout");
          console.log("Session cookie cleared in backend");
        }
        setUser(currentUser);
      } catch (err) {
        console.error("Auth synchronization error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};
