import { NextResponse } from "next/server";
import { createNewUser } from "@/app/(authentication)/auth-components/server-side/createNewUser";
import { Role } from "@/app/(authentication)/auth-components/server-side/constant";
import { FirebaseError } from "firebase-admin";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    await createNewUser(email, password, Role.USER);

    return NextResponse.json(
      { success: true, message: "User created successfully" },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Signup error:", error);

    // 🔐 Firebase Admin errors
    if (error?.code) {
      switch (error.code) {
        case "auth/email-already-exists":
          return NextResponse.json(
            { success: false, error: "Email already in use" },
            { status: 409 }
          );

        case "auth/invalid-email":
          return NextResponse.json(
            { success: false, error: "Invalid email address" },
            { status: 400 }
          );

        case "auth/weak-password":
          return NextResponse.json(
            { success: false, error: "Password is too weak" },
            { status: 400 }
          );

        default:
          return NextResponse.json(
            { success: false, error: "Authentication failed" },
            { status: 500 }
          );
      }
    }

    // 🧨 Unknown errors
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
