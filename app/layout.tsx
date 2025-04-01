import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "../contexts/UserContext";
import ClientLayout from "./client-layout";
import { PromptsProvider } from "@/contexts/PromptsContext";
import { Analytics } from "@vercel/analytics/react";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SuperPrompt",
  description: "Find the best prompts for ChatGPT, Grok, and more.",
  keywords: [
    "ChatGPT prompts",
    "how to use ChatGPT",
    "AI prompt guide",
    "best prompts for ChatGPT",
    "prompt examples",
    "AI resume help",
    "Midjourney prompts",
    "productivity with AI",
    "learn prompt engineering",
    "SuperPrompt",
  ],
  openGraph: {
    title: "SuperPrompt – Get Better Results from AI",
    description: "Find better prompts for better results",

    url: "https://www.superprompt.tips",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SuperPrompt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.superprompt.tips/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${inter.className} antialiased bg-black`}>
        <UserProvider>
          <ClientLayout>
            <PromptsProvider>{children}</PromptsProvider>
          </ClientLayout>
        </UserProvider>
        <Analytics />
      </body>
    </html>
  );
}
