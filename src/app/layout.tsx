import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import AuthProvider from "@/components/SessionProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Treelink – psgpraveen",
  description: "Create and share your personalized link hub with Treelink, built by psgpraveen using Next.js, Tailwind CSS, and modern web technologies.",
  icons: {
    icon: "/img.png",
  },
  keywords: [
    "Treelink",
    "psgpraveen",
    "Next.js",
    "Linktree clone",
    "Personalized links",
    "React",
    "Full Stack Developer",
    "Portfolio",
    "GitHub",
    "Social Links",
  ],
  openGraph: {
    title: "Treelink – psgpraveen",
    description: "Your all-in-one link profile. Share your links, social media, and portfolio from one place.",
    url: "https://linktree-psgpraveen.vercel.app", 
    siteName: "Treelink by psgpraveen",
    images: [
      {
        url: "/img.png", // Place this image inside /public
        width: 1200,
        height: 630,
        alt: "Treelink by psgpraveen",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Treelink – psgpraveen",
    description: "Your all-in-one link profile. Built with Next.js by psgpraveen.",
    creator: "@psgpraveen",
    images: ["/img.png"],
  },
  metadataBase: new URL("https://linktree-psgpraveen.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://psgpraveen.vercel.app" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <main className="min-h-screen transition-all duration-500">{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
