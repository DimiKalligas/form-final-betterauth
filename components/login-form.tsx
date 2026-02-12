"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type TLoginSchema } from "@/lib/types";
import { EmailTemplate } from "./email-template";
import { loginUser } from "@/app/actions/login-user";
import { signIn } from "@/lib/auth-client";
// import { sendEmail } from "@/app/actions/email"; Συγχωνεύτηκε με ^
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldError } from "./ui/field";
// import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError, // ✅ Used to set manual errors
    formState: { errors, isSubmitting }, // subscribe to the errors object
    // reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: TLoginSchema) => {
  // Better-Auth uses 'values' directly
    const { data, error } = await signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/dashboard", // Better-Auth can handle the redirect for you
  });

    if (error) {
      // 1. Handle Better-Auth specific errors
      // Better-Auth errors often have a 'status' or 'code'
      // If it's a credential error, we map it to the password field
      console.error("Full Auth Error:", error);
      if (error.status === 401 || error.code === "INVALID_EMAIL_OR_PASSWORD") {
        setError("password", {
          type: "server",
          message: "Invalid email or password",
        });
      }

      // 2. Show the toast with the error message provided by the library
      toast.error(error.message || "Login failed");
      return;
    }

    toast.success("Logged in successfully!");
    router.push("/dashboard"); // Redirect user after login
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
          {/* EMAIL */}
          <input {...register("email")} placeholder="Email" className="border p-2" />
          {/* This will now show BOTH Zod client errors AND Server Action errors */}
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          
          {/* PASSWORD */}     
          <input {...register("password")} placeholder="Password" className="border p-2" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <Button 
            variant="outline" 
            onClick={async () => {
              await signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
              });
            }}
          >
            Login with Google
          </Button>

          <Button 
            type="submit"
            variant="outline" 
            disabled={isSubmitting} className="bg-blue-500 text-white p-2">
            {isSubmitting ? "Authenticating..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm">Don't have an account?</p>
        <Link href="/" className="text-blue-500 underline ml-2">Sign up</Link>
      </CardFooter>
    </Card>
  );
}