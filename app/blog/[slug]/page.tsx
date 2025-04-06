import posts from "@/data/blogPosts.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import BlogMarkdown from "@/components/Markdown/BlogMarkdown";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    slug: string;
  }>; // Updated type to reflect that params is a Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;
  const post = posts.find((p) => p.slug === awaitedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | SuperPrompt Blog`,
    description: post.content.replace(/[#*_`\n]/g, "").slice(0, 160),
    keywords: post.keywords || [],
    openGraph: {
      title: post.title,
      description: post.content.replace(/[#*_`\n]/g, "").slice(0, 160),
      type: "article",
      publishedTime: post.date,
      url: `https://www.superprompt.tips/blog/${post.slug}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "SuperPrompt",
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const awaitedParams = await params;
  const post = posts.find((p) => p.slug === awaitedParams.slug);

  if (!post) return notFound();

  return (
    <main className="text-white">
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to all posts
        </Link>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        {new Date(post.date).toLocaleDateString()} - 5 min read
      </p>
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>

      <article className="prose prose-invert prose-lg max-w-none">
        <BlogMarkdown>{post.content}</BlogMarkdown>
      </article>
    </main>
  );
}
