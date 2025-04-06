import PromptDetail from "@/components/PromptDetail";
import { getPrompt } from "@/lib/promptCache";
import { Prompt } from "@/types/database";

type Props = {
  params: Promise<{
    slug: string;
  }>; // Updated type to reflect that params is a Promise
};
// Generate metadata from prompt data
function generatePromptMetadata(prompt: Prompt) {
  if (!prompt) {
    return {
      title: "Prompt Not Found - SuperPrompt",
      description: "Explore the best AI prompts at SuperPrompt",
    };
  }

  return {
    title: `${prompt.title} - SuperPrompt`,
    description: prompt.description,
    keywords: prompt.tags?.join(", "),
  };
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props) {
  const awaitedParams = await params;
  const { slug } = awaitedParams;

  const prompt = await getPrompt(slug);
  return generatePromptMetadata(prompt);
}

// Server Component for SSR
export default async function PromptPage({ params }: Props) {
  const awaitedParams = await params;
  const { slug } = awaitedParams;

  const prompt = await getPrompt(slug);

  if (!prompt) {
    return (
      <div className="text-center py-12 text-red-400">
        <p>Prompt not found</p>
      </div>
    );
  }

  return <PromptDetail prompt={prompt} />;
}
