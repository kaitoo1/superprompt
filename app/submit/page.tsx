"use client";

import { useRouter } from "next/navigation";
import { useUser } from "../../contexts/UserContext";
import Layout from "../../components/HomePage";
import SubmitPromptForm from "../../components/SubmitPromptForm";
import { useEffect } from "react";

export default function SubmitPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if user is not logged in and we've checked auth status
    if (!loading && !user) {
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

  // If user is not logged in, this will redirect (see useEffect)
  if (!user) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p>You must be signed in to submit a prompt.</p>
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
