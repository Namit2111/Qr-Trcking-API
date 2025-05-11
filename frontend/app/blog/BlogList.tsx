"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PostMetadata } from '@/lib/mdx';
import PaginationBar from '@/components/PaginationBar';

interface BlogListProps {
  posts: PostMetadata[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [search, setSearch] = useState('');
 const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
  const filteredPosts = useMemo(() => {
    if (!search) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, posts]);
  const totalPages = Math.ceil((filteredPosts ?? []).length / pageSize);
      const paginatedPosts = (filteredPosts ?? []).slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 pb-16">
      {/* Hero Section */}
      <section className="w-full border-b border-slate-200 py-12 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-3">Blog & Resources</h1>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">
              Explore our latest articles and insights on QR codes, technology, and digital innovation. 
              Stay ahead with tips, guides, and stories to help you grow.
            </p>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none text-lg transition-all shadow-sm"
                  aria-label="Search blog posts"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <div className="max-w-6xl mx-auto px-4">
        {paginatedPosts.length === 0 ? (
          <div className="text-center text-slate-500 py-20 text-lg">No articles found. Try a different search.</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                {post.image && (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={false}
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col p-6">
                  <h2 className="text-2xl font-bold mb-2 text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <p className="text-slate-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                  <div className="mt-auto flex items-center gap-2 text-emerald-700 font-semibold group-hover:underline">
                    <span>Read Article</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <PaginationBar 
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        />
    </div>
  );
} 