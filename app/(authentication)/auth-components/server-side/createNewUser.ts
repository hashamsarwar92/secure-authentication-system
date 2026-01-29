"use server";
import { adminAuth, adminDb } from "./firebase-admin";
import { AuthUserModel } from "../AuthUserModel";
import { Collection } from "./constant";

export const createNewUser = async (email: string, password: string, role: string): Promise<void> => {
    try {
      const userRecord = await adminAuth.createUser({
        email,
        password,
      });
      const newUser: AuthUserModel = {
        uid: userRecord.uid,
        email: userRecord.email || "",
        isEmailVerified: userRecord.emailVerified,
        role: role,
      };

      await adminAuth.setCustomUserClaims(userRecord.uid, {
        role: newUser.role,
      });

      await adminDb.collection(Collection.USERS).doc(newUser.uid).set(newUser);
    } catch (error) {
    // 🔥 Preserve Firebase error
    throw error;
  }
  }