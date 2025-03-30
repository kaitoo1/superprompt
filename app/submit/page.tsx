"use client";

import { useRouter } from "next/navigation";
import { useUser } from "../../contexts/UserContext";
import Layout from "../../components/HomePage";
import SubmitPromptForm from "../../components/SubmitPromptForm";
import { useEffect } from "react";

const AUTHORIZED_USER_ID = "21a024e3-2be8-4762-b61b-17217f4936f0";

export default function SubmitPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if:
    // 1. We've checked auth status (not loading) AND
    // 2. Either user is not logged in OR user ID doesn't match authorized ID
    if (!loading && (!user || user.id !== AUTHORIZED_USER_ID)) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleCancel = () => {
    router.push("/");
  };

  const handleSuccess = () => {
    router.push("/");
  };

  // Show nothing while checking auth status
  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </Layout>
    );
  }

  // If user is not authorized, show access denied message
  // This will only briefly show before redirect happens
  if (!user || user.id !== AUTHORIZED_USER_ID) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-400">Access denied.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SubmitPromptForm onCancel={handleCancel} onSuccess={handleSuccess} />
    </Layout>
  );
}
