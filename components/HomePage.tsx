"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useUser } from "../contexts/UserContext";

interface HomePageProps {
  children: React.ReactNode;
}

const HomePage: React.FC<HomePageProps> = ({ children }) => {
  const { user, signOut, setIsSignInModalOpen } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [dropdownOpen]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    setDropdownOpen(false);
  }, [signOut]);

  const handleSignInClick = useCallback(() => {
    setIsSignInModalOpen(true);
  }, [setIsSignInModalOpen]);
  return (
    <div className="min-h-screen bg-black text-white">
      <header className=" py-4 px-6 shadow-md ">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-white tracking-wide"
          >
            SUPERPROMPT
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-white hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
                >
                  <span>Account</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 text-sm text-zinc-300 border-b border-zinc-700 truncate">
                      {user.email}
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignInClick}
                className="block w-full text-left px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">{children}</main>
    </div>
  );
};

export default HomePage;
