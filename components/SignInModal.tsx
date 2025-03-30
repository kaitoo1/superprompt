"use client";

import { useEffect, useCallback } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabase";

interface SignInModalProps {
  onCloseAction: () => void;
}

export default function SignInModal({ onCloseAction }: SignInModalProps) {
  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("session", session);

        onCloseAction();
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        console.log("session sub", session);

        onCloseAction();
      }
    });

    return () => subscription.unsubscribe();
  }, [onCloseAction]);

  const clickOutside = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onCloseAction();
      }
    },
    [onCloseAction]
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={clickOutside}
    >
      <div className="bg-zinc-800 p-8 rounded-lg max-w-md w-full relative">
        <button
          onClick={onCloseAction}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-6 text-center text-white">
          Sign In to SuperPrompt
        </h2>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
          }}
          providers={["google"]}
          onlyThirdPartyProviders={true}
          redirectTo={
            typeof window !== "undefined" ? window.location.origin : undefined
          }
        />
      </div>
    </div>
  );
}
