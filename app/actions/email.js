"use server"

// import { Subscriber } from "@/models/subs-model";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

import { revalidatePath } from "next/cache";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// να το κάνω ξεχωριστό αρχείο client, αλλά <-
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString })
const prisma = new PrismaClient({ adapter,})

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData) {
  // try {
    // 1. Correct way to get data from FormData
    const email = formData["email"];
    const password = formData["password"];
    // const email = formData.get("email") // as string;
    // const fullName = formData.get("fullName") as string;

    if (!email) return { success: false, error: "Email is required" };
    console.log(email, password);

    // 2. Δες αν υπάρχει στη βάση
    // const foundSubscriber = await Subscriber.findOne({
    //   email: email,
    // }).lean();
    
    // 3. Persist to Database (example with Prisma)
    try {
      await prisma.user.create({
        data: {
          email: email,
          password: password,
        },
      });
    } catch (e) {
      console.error('Database error:');
      return { success: false, error: "Database error" };
    }

      const message = `Dear ${email}, Μπράβο σου..`;

      try {
        const { data, error } = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: 'net.logix@yahoo.gr', //email,
          subject: "resend dev email",
          html: `Dear ${email}, Μπράβο σου..`,
          // react: EmailTemplate({ message }),
        });

        if (error) {
              return { success: false, error };
            }
        
        revalidatePath('/');
        return { success: true, data };

      } catch (error) {
        return { success: false, error: 'Failed to send email' };
      }
  
      // revalidatePath('/');
}