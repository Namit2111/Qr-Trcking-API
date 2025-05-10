import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calculateReadTime } from './utils';
import { serialize } from 'next-mdx-remote/serialize';

const contentDirectory = path.join(process.cwd(), 'content');

export interface FAQ {
  question: string;
  answer: string;
}

export interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  image?: string;
  readTime: number;
  faqs?: FAQ[];
}

export interface Post {
  frontmatter: PostMetadata;
  content: string;
}

export async function getMDXFiles() {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  return fs.readdirSync(contentDirectory)
    .filter(file => file.endsWith('.mdx'));
}

export async function getPostMetadata(): Promise<PostMetadata[]> {
  const files = await fs.promises.readdir(contentDirectory);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const filePath = path.join(contentDirectory, file);
        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        const { data } = matter(fileContent);
        const slug = file.replace(/\.mdx$/, '');

        return {
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          image: data.image,
          readTime: data.readTime,
          slug,
          faqs: data.faqs || [],
        };
      })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(fileContents);
    
    return {
      content: content,
      frontmatter: {
        title: data.title,
        date: data.date,
        excerpt: data.excerpt || '',
        image: data.image || null,
        readTime: calculateReadTime(content),
        slug,
        faqs: data.faqs || []
      }
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}