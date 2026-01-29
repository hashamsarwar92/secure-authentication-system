// /lib/auth.ts
import { cookies as nextCookies } from "next/headers";
import { adminAuth } from "./firebase-admin";

export async function getCurrentUser() {
  // ⚡ In some Next.js versions, cookies() is async
  const cookieStore = await nextCookies(); // use await if TS thinks it's a Promise

  // Read the cookie
  const sessionCookie = cookieStore.get("sas_session"); // { name, value } | undefined
  const session = sessionCookie?.value;

  if (!session) return null;

  try {
    // Verify token using Admin SDK
    const decodedToken = await adminAuth.verifyIdToken(session);
    return decodedToken;
  } catch (err) {
    console.log("Token verification failed:", err);
    return null;
  }
}
