import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "../contexts/UserContext";
import ClientLayout from "./client-layout";
import { PromptsProvider } from "@/contexts/PromptsContext";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SuperPrompt",
  description: "Find the best prompts for ChatGPT, Grok, and more.",
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
      </body>
    </html>
  );
}
