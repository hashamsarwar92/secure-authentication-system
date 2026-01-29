// Receives Firebase ID token from client
// Verifies it using Admin SDK
// Creates HttpOnly cookie

import { NextResponse } from "next/server";
import {adminAuth} from "@/app/(authentication)/auth-components/server-side/firebase-admin";

export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    // Verify token is REAL
    await adminAuth.verifyIdToken(token);

    const res = NextResponse.json({ success: true });

    // Secure cookie (cannot be accessed by JS)
    res.cookies.set("sas_session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return res;
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
