"use client";

import Layout from "../components/HomePage";
import HomeContent from "../components/HomeContent";

import { PromptsProvider } from "@/contexts/PromptsContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import HomePage from "../components/HomePage";
const queryClient = new QueryClient();

export default function Home() {
  return (
    // <QueryClientProvider client={queryClient}>
    <HomePage>
      <HomeContent />
    </HomePage>
    // </QueryClientProvider>
  );
}
