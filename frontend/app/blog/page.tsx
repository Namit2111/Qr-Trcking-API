import { getPostMetadata } from '@/lib/mdx';
import BlogList from './BlogList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Code Blog | Tips, Guides & Best Practices',
  description: 'Explore our comprehensive guides, tips, and best practices for QR codes. Learn about QR code generation, customization, tracking, and implementation strategies for your business.',
  openGraph: {
    title: 'QR Code Blog | Tips, Guides & Best Practices',
    description: 'Explore our comprehensive guides, tips, and best practices for QR codes. Learn about QR code generation, customization, tracking, and implementation strategies.',
    type: 'website',
  },
  keywords: ['QR code blog', 'QR code guides', 'QR code tips', 'QR code best practices', 'QR code implementation', 'QR code marketing'],
};

export default async function BlogPage() {
  const posts = await getPostMetadata();
  return <BlogList posts={posts} />;
}