"use server";

import { ActionResponse, loginSchema, TLoginSchema } from "@/lib/types";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
// import bcrypt from "bcryptjs"
import { Resend } from "resend";

const adapter = new PrismaBetterSqlite3({ url: `${process.env.DATABASE_URL}` });
const prisma = new PrismaClient({ adapter });

export async function loginUser(data: TLoginSchema): Promise<ActionResponse> {
  // zod validation
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return { success: false, message: "Validation failed.", errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;
  // 12 rounds is a good balance of speed/security
  // const hashedPassword = await bcrypt.hash(password, 12);

  // Find User
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Business Logic Errors
    if (!user || user.password !== password) {
      return { 
        success: false, 
        message: "Invalid credentials.", 
        // We attach the error to the 'password' field so the UI highlights it
        errors: { password: ["Invalid email or password."] } 
      };
    }

    // 4. Success logic 
    // TODO set a cookie or JWT session here (e.g., using iron-session or NextAuth)
    return { success: true, message: "Welcome back!" };

  } catch (error: any) {
        return { success: false, message: "Something went wrong. Please try again." };
  }
}