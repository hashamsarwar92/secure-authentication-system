

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import { auth } from "@/app/(authentication)/auth-components/client-side/firebase-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ResetPasswordForm = ({ oobCode }: { oobCode: string }) => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!oobCode) {
      setError("Invalid reset link");
      setLoading(false);
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
      .then(() => setLoading(false))
      .catch(() => {
        setError("This reset link is invalid or expired");
        setLoading(false);
      });
  }, [oobCode]);

  const handleReset = async () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await confirmPasswordReset(auth, oobCode!, password);
      router.push("/signin?reset=success");
    } catch (err: any) {
      setError(err.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Verifying link...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>

        <Input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button onClick={handleReset} className="w-full">
          Reset Password
        </Button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
