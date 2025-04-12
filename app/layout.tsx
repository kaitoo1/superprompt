import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "../contexts/UserContext";
import ClientLayout from "./client-layout";
import { PromptsProvider } from "@/contexts/PromptsContext";
import { Analytics } from "@vercel/analytics/react";
import FeedbackButton from "@/components/FeedbackButton";
import Header from "@/components/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeScript from "./theme-script";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.superprompt.tips"),
  title: "SuperPrompt - Best AI Prompts",
  description:
    "Get better results from ChatGPT, Grok, and more using expertly crafted prompts.",
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
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen text-black`}
      >
        <ThemeProvider>
          <ThemeScript />
          <UserProvider>
            <Header />
            <ClientLayout>
              <PromptsProvider>
                <main className="container mx-auto py-8 px-4">{children}</main>
              </PromptsProvider>
            </ClientLayout>
          </UserProvider>
          <Analytics />
          <FeedbackButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
