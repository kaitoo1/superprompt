"use client";

import { useRouter, useParams } from "next/navigation";
import Layout from "../../../components/HomePage";
import PromptDetail from "../../../components/PromptDetail";
import { usePrompt } from "@/hooks/usePrompt";
import { memo, useCallback } from "react";

const PromptPage = memo(() => {
  const router = useRouter();
  const params = useParams();

  const { data: prompt, isLoading, error } = usePrompt(params.id as string);

  const handleBack = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <Layout>
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4">Loading prompt details...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-400">
          <p>{error.message}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition-colors"
            onClick={handleBack}
          >
            Back to Home
          </button>
        </div>
      ) : prompt ? (
        <PromptDetail prompt={prompt} onBack={handleBack} />
      ) : null}
    </Layout>
  );
});

PromptPage.displayName = "PromptPage";

export default PromptPage;
