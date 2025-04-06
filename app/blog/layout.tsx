import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <div className="max-w-2xl mx-auto px-4 py-10">{children}</div>;
}
