import { getPostMetadata } from '@/lib/mdx';
import BlogList from './BlogList';

export const metadata = {
  title: 'Blog | QR Small',
  description: 'Explore our latest articles and insights on QR codes, technology, and more.',
  openGraph: {
    title: 'Blog | QR Small',
    description: 'Explore our latest articles and insights on QR codes, technology, and more.',
    type: 'website',
  },
};

export default async function BlogPage() {
  const posts = await getPostMetadata();
  return <BlogList posts={posts} />;
}