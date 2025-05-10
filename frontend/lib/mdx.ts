import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calculateReadTime } from './utils';
import { serialize } from 'next-mdx-remote/serialize';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  image?: string;
  readTime: number;
}

export interface Post {
  content: any; // Changed from string to any to handle serialized MDX
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    image?: string;
    readTime: number;
  };
}

export async function getMDXFiles() {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  return fs.readdirSync(contentDirectory)
    .filter(file => file.endsWith('.mdx'));
}

export async function getPostMetadata(): Promise<PostMetadata[]> {
  const mdxFiles = await getMDXFiles();
  
  const posts = mdxFiles.map(fileName => {
    const filePath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || '',
      image: data.image || null,
      slug: fileName.replace('.mdx', ''),
      readTime: calculateReadTime(content)
    };
  });
  
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(fileContents);
    
    // Serialize the MDX content
    const mdxSource = await serialize(content, {
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
      },
      parseFrontmatter: true,
    });
    
    return {
      content: mdxSource,
      frontmatter: {
        title: data.title,
        date: data.date,
        excerpt: data.excerpt || '',
        image: data.image || null,
        readTime: calculateReadTime(content)
      }
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}