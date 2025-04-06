"use client";

import { useSession } from "next-auth/react";
import TreeLink from "@/components/TreeLink";
import Auth from "@/components/Auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl mt-16 lg:mt-8 font-bold mb-4">
          Google Authentication
        </h1>

        <div className="w-full max-w-md">
          <Auth />
        </div>

        <div className="mt-6 w-full max-w-2xl">
          {session ? (
            <TreeLink />
          ) : (
            <p className="text-base sm:text-lg text-gray-600">
              Please login to access your TreeLink.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
