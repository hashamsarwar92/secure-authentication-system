"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/app/(authentication)/auth-components/client-side/firebase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { forgotPasswordSchema } from "../auth-components/AuthSchemas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleOnSubmit = async (
    data: z.infer<typeof forgotPasswordSchema>
  ) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await sendPasswordResetEmail(auth, data.email);
      setSuccessMessage(
        "Password reset email sent. Please check your inbox."
      );
      form.reset();
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("No account found with this email.");
            break;
          case "auth/invalid-email":
            setErrorMessage("Please enter a valid email address.");
            break;
          case "auth/too-many-requests":
            setErrorMessage("Too many attempts. Try again later.");
            break;
          default:
            setErrorMessage("Failed to send reset email.");
        }
      } else {
        setErrorMessage("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter your email to receive a password reset link
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="space-y-6"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => {
                const id = "forgot_password_email";
                return (
                <FormItem>
                  <FormLabel htmlFor={id}>Email</FormLabel>
                  <FormControl>
                    <Input
                      id={id}
                      placeholder="you@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
              }}
            />

            {successMessage && (
              <div className="text-sm text-green-700 bg-green-50 p-3 rounded">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="text-sm text-red-700 bg-red-50 p-3 rounded">
                {errorMessage}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Email"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <Link href="/signin" className="text-blue-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
