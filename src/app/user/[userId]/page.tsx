'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaLink,
  FaWhatsapp, FaFacebook, FaTelegram, FaReddit
} from "react-icons/fa";

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
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ totalLinks: 0, followers: 0 });

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`/api/treelink?userId=${encodeURIComponent(userId)}`);
        const data = await response.json();

        if (response.ok && data.links?.length > 0) {
          setLinks(data.links);
          setProfilePic(data.profilePic || null);
          setStats({ totalLinks: data.links.length, followers: data.followers || 0 });
        } else {
          setError("User does not exist or no links found.");
        }
      } catch (err) {
        setError("Network error. Please try again later.");
        console.log(err);
        
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchLinks();
    }
  }, [userId]);

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Profile link copied to clipboard!");
  };

  const shareProfile = (platform: string) => {
    const url = window.location.href;
    let shareUrl = "";

    switch (platform) {
      case 'whatsapp': shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`; break;
      case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break;
      case 'twitter': shareUrl = `https://twitter.com/share?url=${encodeURIComponent(url)}`; break;
      case 'linkedin': shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`; break;
      case 'telegram': shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`; break;
      case 'reddit': shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}`; break;
      default: return;
    }

    window.open(shareUrl, '_blank');
  };

  const getIconComponent = (url: string) => {
    const lowered = url.toLowerCase();
    if (lowered.includes("github.com")) return <FaGithub className="text-xl" />;
    if (lowered.includes("linkedin.com")) return <FaLinkedin className="text-xl" />;
    if (lowered.includes("twitter.com")) return <FaTwitter className="text-xl" />;
    if (lowered.includes("instagram.com")) return <FaInstagram className="text-xl" />;
    return <FaLink className="text-xl" />;
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4 overflow-hidden">

      {/* Background SVG floating circles */}
      <svg className="absolute top-0 left-0 -z-10 animate-pulse" width="100%" height="100%">
        <circle cx="10%" cy="20%" r="60" fill="#dbeafe" opacity="0.3" />
        <circle cx="80%" cy="10%" r="40" fill="#93c5fd" opacity="0.2" />
        <circle cx="20%" cy="90%" r="50" fill="#60a5fa" opacity="0.15" />
      </svg>

      {/* Animated Container */}
      <motion.div
        className="flex flex-col items-center w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {loading && (
          <div className="flex flex-col items-center">
            <p className="text-lg text-gray-600 mb-4 font-medium">Loading profile...</p>
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center">
            <p className="text-lg text-red-500 font-medium mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <motion.div
              className="flex flex-col items-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={profilePic || "/default-avatar.png"}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full border-4 border-blue-400 object-cover shadow-lg hover:scale-105 transition-all"
              />
             <h2 className="text-2xl sm:text-3xl font-semibold mt-4 text-gray-800 text-center">
  🌿 {userId.split("@")[0]}&apos;s Links
</h2>

              <p className="text-sm text-gray-500 mt-1">{userId}</p>

              <div className="mt-4 text-center text-gray-600">
                <p><strong>{stats.totalLinks}</strong> Links</p>
                <p><strong>{stats.followers}</strong> Followers</p>
              </div>
            </motion.div>

            <div className="w-full max-w-md">
              {links.length > 0 ? (
                links.map((l, index) => (
                  <motion.a
                    key={index}
                    href={l.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 justify-center w-full text-center p-4 mt-4 font-medium text-white bg-blue-600 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-[1.03]"
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {getIconComponent(l.link)}
                    {l.title}
                  </motion.a>
                ))
              ) : (
                <p className="text-center text-gray-500 mt-4">No links available.</p>
              )}
            </div>
          </>
        )}
      </motion.div>

      {/* Share Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button onClick={copyProfileLink} className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-all">
          Copy Link
        </button>
        <button onClick={() => shareProfile('whatsapp')} className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-all">
          <FaWhatsapp className="text-xl" />
        </button>
        <button onClick={() => shareProfile('facebook')} className="bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800 transition-all">
          <FaFacebook className="text-xl" />
        </button>
        <button onClick={() => shareProfile('twitter')} className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 transition-all">
          <FaTwitter className="text-xl" />
        </button>
        <button onClick={() => shareProfile('linkedin')} className="bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800 transition-all">
          <FaLinkedin className="text-xl" />
        </button>
        <button onClick={() => shareProfile('telegram')} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all">
          <FaTelegram className="text-xl" />
        </button>
        <button onClick={() => shareProfile('reddit')} className="bg-orange-600 text-white p-2 rounded-md hover:bg-orange-700 transition-all">
          <FaReddit className="text-xl" />
        </button>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-sm text-gray-500 text-center"
      >
        🚀 Built by{" "}
        <a
          href="https://psgpraveen.github.io/port/"
          className="text-blue-600 hover:underline font-medium"
          target="_blank"
        >
          psgpraveen
        </a>
      </motion.div>
    </div>
  );
};

export default UserPage;
