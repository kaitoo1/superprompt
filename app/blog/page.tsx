import posts from "@/data/blogPosts.json";
import Link from "next/link";

export default function BlogListPage() {
  return (
    <main>
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      {posts.map((post) => (
        <div key={post.slug} className="mb-10">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {new Date(post.date).toLocaleDateString()}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="text-2xl font-semibold  hover:underline"
          >
            {post.title}
          </Link>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2">
            {post.content.replace(/[#*_`\n]/g, "").slice(0, 100)}...
          </p>
        </div>
      ))}
    </main>
  );
}
