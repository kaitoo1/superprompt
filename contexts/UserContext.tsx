"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import SignInModal from "@/components/SignInModal";

interface UserContextType {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  loading: boolean;
  setIsSignInModalOpen: (isOpen: boolean) => void;
}

const UserContext = createContext<UserContextType>({
  session: null,
  user: null,
  signOut: async () => {},
  loading: true,
  setIsSignInModalOpen: () => {},
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const closeSignInModal = useCallback(() => {
    setIsSignInModalOpen(false);
  }, []);

  const value = {
    session,
    user,
    signOut,
    loading,
    setIsSignInModalOpen,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
      {isSignInModalOpen && <SignInModal onCloseAction={closeSignInModal} />}
    </UserContext.Provider>
  );
}
