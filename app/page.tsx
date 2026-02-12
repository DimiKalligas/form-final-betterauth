// 'use client' Το πιο πάνω επίπεδο πρέπει είναι server component!

import SignUpForm from "@/components/signup-form"

export default async function Page() {

  return (
    <main className="p-8 flex justify-center">
      {/* Δεν μπορούμε να έχουμε onFormSubmit σε server */}
      {/* <FormWithPersistence onFormSubmit={handleDataFromForm}  /> */}
      <SignUpForm />
    </main>
  );
}
