"use client";
import { signOutUser } from "@/app/(authentication)/auth-components/client-side/signOutUser";
import { useAuth } from "@/app/(authentication)/auth-components/client-side/useAuth";
import { Button } from "@/components/ui/button";
import { AuthResponse } from "@/app/(authentication)/auth-components/AuthResponse";
import axios from "axios";
import { sign } from "crypto";

export const DashboardPage = () => {
  const { user, loading } = useAuth();
  const handleSignOut = async () => {
    await signOutUser();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold underline">
        {user ? `Welcome, ${user.email}` : loading ? "Loading..." : "Not signed in"}
      </h1>
      <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default DashboardPage;
