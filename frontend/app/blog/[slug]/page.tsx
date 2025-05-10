import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getPostMetadata } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote,compileMDX  } from 'next-mdx-remote/rsc';
import { metadata as siteMetadata } from '../../metadata';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  
  if (!post) {
    return {
      title: 'Post Not Found | QR Small',
    };
  }

  return {
    ...siteMetadata,
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    openGraph: {
      ...siteMetadata.openGraph,
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: 'article',
      publishedTime: post.frontmatter.date,
      images: post.frontmatter.image ? [post.frontmatter.image] : [],
    },
    twitter: {
      ...siteMetadata.twitter,
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: post.frontmatter.image ? [post.frontmatter.image] : [],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }
  console.log(post);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navbar */}
      <header className="border-b border-slate-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md flex items-center justify-center">
                  <Image
                    src="/logo.jpg"
                    alt="Logo"
                    width={32}
                    height={32}
                  />
                </div>
                <h1 className="text-xl font-semibold text-slate-800">QR Small</h1>
              </Link>
            </div>
            <nav>
              <ul className="flex gap-6">
                <li>
                  <Link href="/" className="text-slate-800 font-medium hover:text-emerald-600 transition-colors">
                    Generator
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-800 font-medium hover:text-emerald-600 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <article className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                {post.frontmatter.title}
              </h1>
              <div className="flex items-center gap-4 text-slate-600 mb-6">
                <time dateTime={post.frontmatter.date}>
                  {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span>•</span>
                <span>{post.frontmatter.readTime} min read</span>
              </div>
              {post.frontmatter.image && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
                  <Image
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-emerald-600 hover:prose-a:text-emerald-700 prose-img:rounded-xl">
      
              <MDXRemote source={post.content} />
            </div>

            {/* Back to Blog Link */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <Link
                href="/blog"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} QR Small. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-slate-500 text-sm hover:text-emerald-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-500 text-sm hover:text-emerald-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
