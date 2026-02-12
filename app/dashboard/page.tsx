'use client'

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

function Dashboard() {
  const router = useRouter();

  return (
    <>
      <div className="text-blue-500 underline ml-2">You are logged in!</div>
      <Button
          onClick={() => signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/login"); // redirect to login page
              },
            },
          })
          }
          className="bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
        >
          Sign Out
      </Button>
    </>
  )
}

export default Dashboard