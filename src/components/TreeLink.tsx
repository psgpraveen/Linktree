"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { Trash2, Link2, UserPlus, Loader2 } from "lucide-react";
import QRCode from "react-qr-code";
import Image from "next/image";
import { motion } from "framer-motion";

type LinkType = {
  title: string;
  link: string;
};

type MessageType = {
  type: "success" | "error";
  text: string;
};

const TreeLink = () => {
  const { data: session } = useSession();
  const email = session?.user?.email || "guest@example.com";

  const [userId, setUserId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [links, setLinks] = useState<LinkType[]>([]);
  const [profilePic, setProfilePic] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [picUploading, setPicUploading] = useState<boolean>(false);
  const [userIdUpdating, setUserIdUpdating] = useState<boolean>(false);
  const [userIdMessage, setUserIdMessage] = useState<MessageType | null>(null);
  const [picupdmsg, setPicupdmsg] = useState<MessageType | null>(null);

  const publicLink = `${window.location.origin}/user/${userId}`;

  const fetchLinksByEmail = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/treelink?email=${encodeURIComponent(email)}`
      );
      const { links, userId, profilePic } = response.data;

      if (userId) setUserId(userId);
      if (profilePic) setProfilePic(profilePic);
      setLinks(links || []);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  }, [email]);

  useEffect(() => {
    const init = async () => {
      if (session?.user?.email) {
        setLoad(true);
        await fetchLinksByEmail();
        setLoad(false);
      }
    };
  
    init();
  }, [session, fetchLinksByEmail]);

  const handleProfileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !email) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result as string;
      setProfilePic(base64Image);
      setPicUploading(true);

      try {
        await axios.put("/api/treelink/photo", {
          email,
          profilePic: base64Image,
        });
        setPicupdmsg({ type: "success", text: "✅ Profile updated!" });
      } catch (error) {
        const err = error as AxiosError<{ error: string }>;
        setPicupdmsg({
          type: "error",
          text: `❌ Failed: ${err.response?.data?.error || "Unexpected error"}`,
        });
      } finally {
        setPicUploading(false);
        setTimeout(() => setPicupdmsg(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const addLink = async () => {
    if (!title || !link) return alert("Title and Link are required!");
    if (!userId || !email) return alert("User ID and Email are required!");

    setLoading(true);
    try {
      await axios.post("/api/treelink", { userId, email, title, link });
      setLinks((prev) => [...prev, { title, link }]);
      setTitle("");
      setLink("");
    } catch {
      alert("❌ Failed to add link.");
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (linkToDelete: string) => {
    try {
      await axios.delete(
        `/api/treelink?email=${encodeURIComponent(
          email
        )}&link=${encodeURIComponent(linkToDelete)}`
      );
      setLinks((prev) => prev.filter((l) => l.link !== linkToDelete));
    } catch {
      alert("❌ Could not delete.");
    }
  };

  const updateUserId = async () => {
    if (!userId || !email) {
      setUserIdMessage({
        type: "error",
        text: "User ID and Email are required!",
      });
      return;
    }

    setUserIdUpdating(true);
    try {
      await axios.put("/api/treelink", { userId, email });
      setUserIdMessage({ type: "success", text: "✅ User ID updated!" });
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      if (err.response?.status === 409) {
        setUserIdMessage({ type: "error", text: "❌ ID already taken!" });
      } else {
        setUserIdMessage({
          type: "error",
          text: `❌ Error: ${err.response?.data?.error || "Unexpected error"}`,
        });
      }
    } finally {
      setUserIdUpdating(false);
      setTimeout(() => setUserIdMessage(null), 3000);
    }
  };

  return (<>
      {
        load ? <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center h-screen"
      >
        <motion.div
          className="flex items-center gap-2 p-6 rounded-xl shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={36} />
          <p className="text-xl font-medium text-gray-700 dark:text-gray-200">
            Loading your TreeLink...
          </p>
        </motion.div>
      </motion.div>: 
    <div className="p-6 max-w-2xl mx-auto rounded-2xl shadow-xl">
      {/* Profile Upload */}
      <div className="flex flex-col items-center relative">
        <label
          htmlFor="profile-upload"
          className="cursor-pointer relative group"
          >
          <div className="relative w-24 h-24">
            <Image
              src={profilePic || "/default-avatar.png"}
              alt="Profile"
              fill
              className="rounded-full object-cover border-4 border-blue-400 shadow-md"
              />
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm font-semibold transition">
              {picUploading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Upload"
              )}
            </div>
          </div>
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleProfileUpload}
          className="hidden"
          />
        <h2 className="text-3xl font-bold mt-4">🌿 Your TreeLink</h2>
        <p className="text-sm text-gray-500">{email}</p>
        {picupdmsg && (
          <p
          className={`mt-2 text-sm ${
            picupdmsg.type === "success" ? "text-green-600" : "text-red-600"
          }`}
          >
            {picupdmsg.text}
          </p>
        )}
      </div>

      {/* User ID */}
      <div className="mt-6">
        <label className="block text-sm font-semibold mb-1">User ID</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. yourname123"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setUserIdMessage(null);
            }}
            className="border p-2 rounded w-full"
            />
          <button
            onClick={updateUserId}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            {userIdUpdating ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              "Update"
            )}
          </button>
        </div>
        {userIdMessage && (
          <p
            className={`mt-2 text-sm ${
              userIdMessage.type === "success"
              ? "text-green-600"
                : "text-red-600"
              }`}
              >
            {userIdMessage.text}
          </p>
        )}
      </div>

      {/* Add Link Form */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            placeholder="Portfolio, GitHub..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">Link</label>
          <input
            type="url"
            placeholder="https://example.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border p-2 rounded w-full"
            />
        </div>
      </div>

      <button
        onClick={addLink}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <UserPlus size={18} /> Add Link
          </>
        )}
      </button>

      {/* QR Code */}
      <div className="mt-6 flex flex-col items-center">
        <button
          onClick={() => setShowQR(!showQR)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
          {showQR ? "Hide QR & Link" : "Show QR & Public Link"}
        </button>
        {showQR && userId && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <QRCode
              value={publicLink}
              size={128}
              className="bg-white p-2 rounded shadow-md"
              />
            <p className="text-xs text-center text-gray-500 break-words max-w-xs">
              Profile Link: <br />
              <a
                href={publicLink}
                target="_blank"
                className="text-blue-600 hover:underline"
                >
                {publicLink}
              </a>
            </p>
          </div>
        )}
      </div>

      {/* User Links */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-3">🔗 Your Links</h3>
        {links.length > 0 ? (
          <ul className="space-y-3">
            {links.map((l, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <a
                  href={l.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                  <Link2 size={18} /> {l.title}
                </a>
                <button
                  onClick={() => deleteLink(l.link)}
                  className="text-red-500 hover:text-red-700"
                  >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-3">No links added yet.</p>
        )}
      </div>
    </div>
       }  </>
  );
};

export default TreeLink;
