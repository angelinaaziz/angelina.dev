import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'src/app/blog');
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
  return files.map(filename => ({ slug: filename.replace(/\.mdx$/, '') }));
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Custom MDX components with perfect spacing
const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-5xl font-bold text-slate-800 mb-16 mt-20 leading-tight tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-4xl font-bold text-slate-800 mb-12 mt-24 leading-tight tracking-tight relative pl-6">
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-semibold text-purple-700 mb-8 mt-16 leading-tight">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-xl font-semibold text-slate-700 mb-6 mt-12 leading-tight">
      {children}
    </h4>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg text-slate-700 leading-relaxed mb-12 tracking-wide">
      {children}
    </p>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-purple-300 pl-8 italic text-slate-600 text-2xl leading-relaxed my-16 bg-gradient-to-r from-purple-50/50 to-transparent py-8 rounded-r-2xl">
      {children}
    </blockquote>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-12 text-lg space-y-4 list-disc pl-6">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-12 text-lg space-y-4 list-decimal pl-6">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-slate-700 leading-relaxed mb-3 pl-2">
      {children}
    </li>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a 
      href={href} 
      className="text-purple-600 font-medium no-underline hover:underline underline-offset-4 decoration-2 decoration-purple-300 hover:decoration-purple-600 transition-all duration-300"
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
    <code className="text-purple-700 bg-purple-50 px-2 py-1 rounded text-base font-mono font-medium">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-slate-50 rounded-2xl p-8 border border-slate-200 my-12 shadow-soft overflow-x-auto">
      {children}
    </pre>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-16 w-full shadow-soft rounded-2xl overflow-hidden border border-slate-200">
      <table className="w-full">
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
    <th className="text-left font-semibold text-slate-900 py-4 px-6 border-b border-slate-200">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="py-4 px-6 border-b border-slate-100 text-slate-700">
      {children}
    </td>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="hover:bg-purple-50/30 transition-colors duration-200">
      {children}
    </tr>
  ),
  hr: () => (
    <hr className="my-24 border-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <img 
      src={src} 
      alt={alt} 
      className="rounded-2xl shadow-soft my-16 border border-purple-100 w-full"
    />
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blogDir = path.join(process.cwd(), 'src/app/blog');
  const filePath = path.join(blogDir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dots bg-dots opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 to-white"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="mb-6 inline-block">
              <div className="px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
                Blog Post
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tight text-slate-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-accent-pink to-accent-peach animate-gradient bg-size-200">
                {data.title}
              </span>
            </h1>
            
            <div className="flex items-center justify-center text-slate-600 space-x-6 text-lg">
              <time dateTime={data.date} className="flex items-center">
                <span className="mr-2">📅</span>
                {new Date(data.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
              <span className="text-purple-300">•</span>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-16">
          <article className="max-w-3xl mx-auto">
            <MDXRemote source={content} components={components} />
          </article>

          {/* Footer */}
          <footer className="max-w-3xl mx-auto mt-20 pt-12 border-t border-gradient-to-r from-transparent via-purple-200 to-transparent relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✨</span>
              </div>
            </div>
            <div className="text-center">
              {data.originallySubstack !== false && (
                <p className="text-slate-500 text-lg mb-4">Originally published on Substack, now hosted on my own site.</p>
              )}
              <div className="flex justify-center space-x-6 text-sm text-slate-400">
                <span>Made with 💜 by Angelina</span>
                <span>•</span>
                <span>Thanks for reading!</span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
} 