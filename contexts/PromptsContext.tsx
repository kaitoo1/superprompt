"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PromptsContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
}

const PromptsContext = createContext<PromptsContextType | undefined>(undefined);

export function PromptsProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <PromptsContext.Provider
      value={{
        searchQuery,
        activeFilter,
        setSearchQuery,
        setActiveFilter,
      }}
    >
      {children}
    </PromptsContext.Provider>
  );
}

export function usePrompts() {
  const context = useContext(PromptsContext);
  if (context === undefined) {
    throw new Error("usePrompts must be used within a PromptsProvider");
  }
  return context;
}
