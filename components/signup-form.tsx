"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type TSignUpSchema } from "@/lib/types";
import { signUp } from "@/lib/auth-client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (values: TSignUpSchema) => {
    // The signUp.email function from better-auth handles the POST 
    // request to your database automatically.
    const { data, error } = await signUp.email({
      email: values.email,
      password: values.password,
      name: values.name, // Make sure your schema includes 'name'
      callbackURL: "/dashboard", // Better-auth can handle the redirect for you
    });

    if (error) {
      // Better-auth returns structured errors (e.g., "User already exists")
      toast.error(error.message || "An error occurred during signup");
      return;
    }

    toast.success("Account created! Redirecting...");
    router.push("/dashboard");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
          {/* NAME FIELD */}
          <div className="flex flex-col gap-y-1">
            <input 
              {...register("name")} 
              placeholder="Full Name" 
              className="border p-2 rounded-md" 
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* EMAIL FIELD */}
          <div className="flex flex-col gap-y-1">
            <input 
              {...register("email")} 
              placeholder="Email" 
              className="border p-2 rounded-md" 
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          
          {/* PASSWORD FIELD */}
          <div className="flex flex-col gap-y-1">
            <input 
              {...register("password")} 
              type="password"
              placeholder="Password" 
              className="border p-2 rounded-md" 
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex flex-col gap-y-1">
            <input 
              {...register("confirmPassword")} 
              type="password" 
              placeholder="Confirm Password" 
              className="border p-2 rounded-md" 
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button 
            type="submit"
            disabled={isSubmitting} 
            className="bg-blue-500 text-white p-2 hover:bg-blue-600"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-y-2">
        <p className="text-sm">
          Already have an account? 
          <Link href="/login" className="text-blue-500 underline ml-1">Log in</Link>
        </p>
      </CardFooter>
    </Card>
  );
}