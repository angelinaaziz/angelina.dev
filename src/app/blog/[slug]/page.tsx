import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import NewsletterInline from '@/components/NewsletterInline';
import type { Metadata } from 'next';

// Define types
type BlogPost = {
  title: string;
  date: string;
  description: string;
  content: string;
  originallySubstack: boolean | undefined;
};

export async function generateStaticParams() {
  try {
    const blogDir = path.join(process.cwd(), 'src', 'app', 'blog');
    const files = fs.readdirSync(blogDir)
      .filter(f => f.endsWith('.mdx'))
      .filter(f => !f.startsWith('page') && !f.startsWith('layout'));
    
    return files.map(filename => ({
      slug: filename.replace(/\.mdx$/, '')
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Custom MDX components with perfect spacing and mobile responsiveness
const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-8 sm:mb-12 lg:mb-16 mt-12 sm:mt-16 lg:mt-20 leading-tight tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-6 sm:mb-8 lg:mb-12 mt-16 sm:mt-20 lg:mt-24 leading-tight tracking-tight relative pl-4 sm:pl-6">
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4 sm:mb-6 lg:mb-8 mt-8 sm:mt-12 lg:mt-16 leading-tight">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-lg sm:text-xl font-semibold text-slate-700 mb-4 sm:mb-6 mt-6 sm:mt-8 lg:mt-12 leading-tight">
      {children}
    </h4>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 sm:mb-8 lg:mb-12 tracking-wide">
      {children}
    </p>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-purple-300 pl-4 sm:pl-6 lg:pl-8 italic text-slate-600 text-lg sm:text-xl lg:text-2xl leading-relaxed my-8 sm:my-12 lg:my-16 bg-gradient-to-r from-purple-50/50 to-transparent py-4 sm:py-6 lg:py-8 rounded-r-2xl">
      {children}
    </blockquote>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-6 sm:my-8 lg:my-12 text-base sm:text-lg space-y-2 sm:space-y-3 lg:space-y-4 list-disc pl-4 sm:pl-6">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-6 sm:my-8 lg:my-12 text-base sm:text-lg space-y-2 sm:space-y-3 lg:space-y-4 list-decimal pl-4 sm:pl-6">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-slate-700 leading-relaxed mb-2 sm:mb-3 pl-1 sm:pl-2">
      {children}
    </li>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a 
      href={href} 
      className="text-purple-600 font-medium no-underline hover:underline underline-offset-4 decoration-2 decoration-purple-300 hover:decoration-purple-600 transition-all duration-300 break-words"
    >
      {children}
    </a>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="text-slate-900 font-semibold">
      {children}
    </strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="text-slate-600 italic">
      {children}
    </em>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="text-purple-700 bg-purple-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-sm sm:text-base font-mono font-medium break-words">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-200 my-6 sm:my-8 lg:my-12 shadow-soft overflow-x-auto text-sm sm:text-base">
      {children}
    </pre>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-8 sm:my-12 lg:my-16 w-full shadow-soft rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 overflow-x-auto">
      <table className="w-full min-w-full">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
      {children}
    </thead>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="text-left font-semibold text-slate-900 py-3 sm:py-4 px-3 sm:px-4 lg:px-6 border-b border-slate-200 text-sm sm:text-base">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="py-3 sm:py-4 px-3 sm:px-4 lg:px-6 border-b border-slate-100 text-slate-700 text-sm sm:text-base">
      {children}
    </td>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="hover:bg-purple-50/30 transition-colors duration-200">
      {children}
    </tr>
  ),
  hr: () => (
    <hr className="my-12 sm:my-16 lg:my-24 border-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <img 
      src={src} 
      alt={alt} 
      className="rounded-xl sm:rounded-2xl shadow-soft my-8 sm:my-12 lg:my-16 border border-purple-100 w-full h-auto"
    />
  ),
};

async function getBlogPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'blog', `${slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`Blog post file not found: ${filePath}`);
      return null;
    }

    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);
    
    if (!data.title || !data.date || !data.description) {
      console.error(`Missing required frontmatter in blog post: ${slug}`);
      return null;
    }

    return {
      title: data.title,
      date: data.date,
      description: data.description,
      content,
      originallySubstack: data.originallySubstack
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const ogImageUrl = `/og-image?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description)}&type=blog`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Angelina Aziz'],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  };
}

export const viewport = {
  themeColor: '#7c3aed',
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    console.error('No slug provided');
    notFound();
  }

  const post = await getBlogPost(slug);

  if (!post) {
    console.error(`Blog post not found: ${slug}`);
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dots bg-dots opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 to-white"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="mb-4 sm:mb-6 inline-block">
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-100 text-purple-600 text-xs sm:text-sm font-medium">
                Blog Post
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 tracking-tight text-slate-800 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-accent-pink to-accent-peach animate-gradient bg-size-200">
                {post.title}
              </span>
            </h1>
            
            <div className="flex flex-col sm:flex-row items-center justify-center text-slate-600 space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-sm sm:text-base lg:text-lg">
              <time dateTime={post.date} className="flex items-center">
                <span className="mr-2">📅</span>
                <span className="text-center sm:text-left">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </time>
              <span className="text-purple-300 hidden sm:inline">•</span>
              <span className="flex items-center">
                <span className="mr-2">✍️</span>
                Angelina Aziz
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 -mt-8 sm:-mt-12 lg:-mt-16">
          <article className="max-w-3xl mx-auto prose prose-slate prose-lg sm:prose-xl lg:prose-2xl prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-700 prose-a:text-purple-600 prose-strong:text-slate-900 prose-code:text-purple-700 prose-code:bg-purple-50 prose-pre:bg-slate-50 prose-blockquote:border-purple-300 prose-blockquote:text-slate-600 max-w-none">
            <MDXRemote source={post.content} components={components} />
          </article>

          {/* Newsletter */}
          <div className="max-w-3xl mx-auto mt-12 sm:mt-16 lg:mt-20">
            <NewsletterInline />
          </div>

          {/* Footer */}
          <footer className="max-w-3xl mx-auto mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 lg:pt-12 border-t border-gradient-to-r from-transparent via-purple-200 to-transparent relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm">✨</span>
              </div>
            </div>
            <div className="text-center">
              {post.originallySubstack !== false && (
                <p className="text-slate-500 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 px-4">Originally published on Substack, now hosted on my own site.</p>
              )}
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm text-slate-400 px-4">
                <span>Made with 💜 by Angelina</span>
                <span className="hidden sm:inline">•</span>
                <span>Thanks for reading!</span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
} 