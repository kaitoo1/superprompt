import posts from "@/data/blogPosts.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import BlogMarkdown from "@/components/Markdown/BlogMarkdown";

import { Metadata } from "next";
import fs from "fs";
import path from "path";
import TableOfContents, { TOCItem } from "../TableOfContents";

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: {
    slug: string;
  };
};

const POSTS_DIR = path.join(process.cwd(), "data/posts");

function extractHeadings(markdown: string): TOCItem[] {
  return markdown
    .split("\n")
    .filter((line) => /^(##) /.test(line)) // ✅ allows only h2 and h3
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const rawText = line.replace(/^#+\s*/, "").trim();
      const id = rawText
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      return { id, text: rawText, level };
    });
}

async function getPost(slug: string) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  const filePath = path.join(POSTS_DIR, post.file || `${slug}.md`);
  let content = "";

  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(`Error reading markdown for slug "${slug}"`, err);
    return null;
  }

  return {
    ...post,
    content,
    headings: extractHeadings(content),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const plainText = post.content.replace(/[#*_`\n]/g, "").slice(0, 160);

  return {
    title: `${post.title} | SuperPrompt Blog`,
    description: plainText,
    keywords: post.keywords || [],
    openGraph: {
      title: post.title,
      description: plainText,
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
  const post = await getPost(params.slug);
  if (!post) return notFound();

  return (
    <main className="dark:text-white text-black relative">
      {post.showTableOfContents && <TableOfContents headings={post.headings} />}

      <div className="mb-8">
        <Link
          href="/blog"
          className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-400 flex items-center gap-2"
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

      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>

      <article className="prose prose-invert prose-lg max-w-none">
        <BlogMarkdown>{post.content}</BlogMarkdown>
      </article>
    </main>
  );
}
