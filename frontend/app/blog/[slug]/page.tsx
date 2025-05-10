import { notFound } from 'next/navigation'
import { getPostBySlug, getPostMetadata, PostMetadata } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getPostMetadata()
  return posts.map((post: PostMetadata) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                ← Back to Blog
              </Link>
            </div>

            <article className="prose prose-slate max-w-none">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">{post.frontmatter.title}</h1>
              <div className="flex items-center gap-4 text-slate-600 mb-8">
                <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
                <span>•</span>
                <span>{post.frontmatter.readTime} min read</span>
              </div>

              {post.frontmatter.image && (
                <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md">
                <MDXRemote source={post.content} />
              </div>
            </article>
          </div>
        </div>
      </main>

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
  )
}
