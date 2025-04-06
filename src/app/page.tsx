"use client";

import { useSession } from "next-auth/react";
import TreeLink from "@/components/TreeLink";
import Auth from "@/components/Auth";
import Header from "@/components/Header";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      <h1 className="text-2xl font-bold mb-4">Next.js Google Authentication</h1>
      <Auth />
      {session ? <TreeLink /> : <p>Please login to access your TreeLink.</p>}
    </div>
  );
}
