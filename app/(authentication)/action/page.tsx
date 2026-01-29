"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { applyActionCode, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "@/app/(authentication)/auth-components/client-side/firebase-client";
import ResetPasswordForm from "@/app/(authentication)/auth-components/ResetPassordForm";
import { useEffect, useState } from "react";

const ActionPage = () => {
  const params = useSearchParams();
  const router = useRouter();

  const mode = params.get("mode");
  const oobCode = params.get("oobCode");

  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");

  useEffect(() => {
    if (!mode || !oobCode) {
      setStatus("error");
      return;
    }

    if (mode === "verifyEmail") {
      applyActionCode(auth, oobCode)
        .then(() => setStatus("ready"))
        .catch(() => setStatus("error"));
    }

    if (mode === "resetPassword") {
      verifyPasswordResetCode(auth, oobCode)
        .then(() => setStatus("ready"))
        .catch(() => setStatus("error"));
    }
  }, [mode, oobCode]);

  if (status === "loading") {
    return <p className="text-center mt-10">Processing...</p>;
  }

  if (status === "error") {
    return <p className="text-center mt-10 text-red-600">
      Invalid or expired link
    </p>;
  }

  // Route by mode
  if (mode === "verifyEmail") {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Email Verified 🎉</h1>
        <button onClick={() => router.push("/signin")}>
          Go to Sign In
        </button>
      </div>
    );
  }

  if (mode === "resetPassword") {
    return <ResetPasswordForm oobCode={oobCode!} />;
  }

  return null;
};

export default ActionPage;
















