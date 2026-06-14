"use client";

import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { ThemeToggle } from "./ThemeToggle";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError("");
    try {
      if (type === "sign-up") {
        const newUser = await signUp({
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        });
        if (newUser) router.push("/");
        else setError("Registration failed. Email may already be in use.");
      }

      if (type === "sign-in") {
        const response = await signIn({ email: data.email, password: data.password });
        if (response) router.push("/");
        else setError("Invalid email or password.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      {/* Header */}
      <header className="flex flex-col gap-5 md:gap-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex-center size-9 rounded-xl bg-brand-blue text-white font-bold text-14 font-clash-display">
              IST
            </div>
            <h1 className="text-24 font-bold text-ist-text font-clash-display">ISTBANK</h1>
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-24 lg:text-30 font-bold text-ist-text font-clash-display">
            {type === "sign-in" ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-16 font-normal text-ist-subtext">
            {type === "sign-in"
              ? "Enter your credentials to access your account"
              : "Fill in your details to get started"}
          </p>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {type === "sign-up" && (
            <>
              <div className="flex gap-4">
                <CustomInput control={form.control} name="firstName" label="First Name" placeholder="John" />
                <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Doe" />
              </div>
              <CustomInput control={form.control} name="address1" label="Address" placeholder="14 Westlands Road" />
              <CustomInput control={form.control} name="city" label="City" placeholder="Nairobi" />
              <div className="flex gap-4">
                <CustomInput control={form.control} name="state" label="State" placeholder="NB" />
                <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="00100" />
              </div>
              <div className="flex gap-4">
                <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" />
                <CustomInput control={form.control} name="ssn" label="SSN" placeholder="1234" />
              </div>
            </>
          )}

          <CustomInput control={form.control} name="email" label="Email" placeholder="you@istbank.com" />
          <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 px-4 py-3">
              <p className="text-14 text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-4 pt-2">
            <Button type="submit" disabled={isLoading} className="form-btn">
              {isLoading ? (
                <><Loader2 size={20} className="animate-spin" />&nbsp;Loading...</>
              ) : type === "sign-in" ? "Sign In" : "Create Account"}
            </Button>
          </div>
        </form>
      </Form>

      <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-ist-subtext">
          {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
        </p>
        <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="form-link">
          {type === "sign-in" ? "Sign up" : "Sign in"}
        </Link>
      </footer>
    </section>
  );
};

export default AuthForm;
