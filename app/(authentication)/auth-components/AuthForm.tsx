"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { authSchema } from "./AuthSchemas";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AuthResponse } from "./AuthResponse";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signInUser } from "./client-side/signInUser";
import { FirebaseError } from "firebase/app";

export type AuthFormProps = {
  title: string;
  subtitle: string;
  actionText: string;
  redirectText: string;
  redirectLink: string;
  isSignIn: boolean;
};

export const AuthForm = ({
  title,
  subtitle,
  actionText,
  redirectText,
  redirectLink,
  isSignIn = false,
}: AuthFormProps) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleOnSubmit = async (data: z.infer<typeof authSchema>) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      if (isSignIn) {
        await signInUser(data.email, data.password);
        router.replace("/dashboard");
      } else {
        await axios.post<AuthResponse>("/api/authentication/signup", data);
        router.replace(redirectLink);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("No account found with this email.");
            break;
          case "auth/invalid-credential":
            setErrorMessage("Invalid credentials provided.");
            break;
          case "auth/wrong-password":
            setErrorMessage("Incorrect password.");
            break;
          case "auth/too-many-requests":
            setErrorMessage("Too many attempts. Try again later.");
            break;
          default:
            setErrorMessage("Authentication failed. Please try again. check your email and password");
        }
        return;
      }
      // 🔹 SIGN UP (API / Axios)
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.error || "Unable to create account",
        );
        return;
      }

      // 🔹 FALLBACK
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRedirectLink = (link: string) => {
    return router.replace(link);
  };

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            {title}
          </h1>
          <p className="mb-4">{subtitle}</p>
          {errorMessage && (
            <div className="text-red-600 text-sm mt-2 text-center">
              {errorMessage}
            </div>
          )}
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
                const id = "auth_email";
                return (
                  <FormItem>
                    <FormLabel htmlFor={id}>Email</FormLabel>
                    <FormControl>
                      <Input id={id} placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => {
                const id = "auth_password";
                return (
                  <FormItem>
                    <FormLabel htmlFor={id}>Password</FormLabel>
                    <FormControl>
                      <Input
                        id={id}
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {isSignIn && (
              <div className="text-sm text-right">
                <Link href="/forgotpassword">Forgot Password?</Link>
              </div>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait...
                </>
              ) : (
                actionText
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
            <Button
              type="button"
              variant="link"
              onClick={() => handleRedirectLink(redirectLink)}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {redirectText}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
