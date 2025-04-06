"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Auth() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      {session ? (
        <>
          <p className="text-lg font-semibold">Welcome, {session.user?.name}</p>
          <img src={session.user?.image!} alt="User Avatar" className="w-12 h-12 rounded-full" />
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
