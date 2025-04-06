"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface LinkItem {
  title: string;
  link: string;
  profilePic?: string;
  email?: string;
}

const UserPage = () => {
  const params = useParams();
  const rawUserId = params?.userId;
  const userId = decodeURIComponent(Array.isArray(rawUserId) ? rawUserId[0] : rawUserId || "");

  const [links, setLinks] = useState<LinkItem[]>([]);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`/api/treelink?userId=${encodeURIComponent(userId)}`);
        const data = await response.json();

        if (response.ok && data.links?.length > 0) {
          setLinks(data.links);
          setProfilePic(data.profilePic || null);
        } else {
          console.error("Error fetching links:", data.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchLinks();
    }
  }, [userId]);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-xl font-semibold text-red-500">❌ User ID is missing in URL.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-white to-gray-200 dark:from-gray-900 dark:to-black py-10 px-4">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <Image
          src={profilePic || "/default-avatar.png"}
          alt="Profile"
          width={96}
          height={96}
          className="rounded-full border-4 border-blue-400 object-cover"
        />
        <h2 className="text-2xl md:text-3xl font-bold mt-4 text-gray-800 dark:text-white text-center">
          🌿 {userId.split("@")[0]}&rsquo;s Links
        </h2>
      </div>

      {/* Links */}
      <div className="w-full max-w-md">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-300">Loading...</p>
        ) : links.length > 0 ? (
          links.map((l, index) => (
            <a
              key={index}
              href={l.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center p-4 mt-4 font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md transition-all hover:scale-105"
            >
              {l.title}
            </a>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No links found.</p>
        )}
      </div>

      {/* Footer */}
      <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
        🚀 Powered by{" "}
        <a
          href="https://psgpraveen.vercel.app"
          className="text-blue-600 font-semibold"
          target="_blank"
        >
          psgpraveen
        </a>
      </p>
    </div>
  );
};

export default UserPage;
