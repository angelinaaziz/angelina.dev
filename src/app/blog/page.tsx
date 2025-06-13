import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';

// Define blog post type
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  excerpt?: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogDir = path.join(process.cwd(), 'src/app/blog');
    const files = fs.readdirSync(blogDir)
      .filter(f => f.endsWith('.mdx'))
      .filter(f => !f.startsWith('page') && !f.startsWith('layout'));

    const posts = files.map(filename => {
      const filePath = path.join(blogDir, filename);
      const source = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(source);
      
      // Better excerpt extraction - get first paragraph after frontmatter
      const contentLines = content.split('\n').filter(line => line.trim() !== '');
      let excerpt = '';
      for (const line of contentLines) {
        if (!line.startsWith('#') && !line.startsWith('>') && line.length > 50) {
          excerpt = line.substring(0, 150) + '...';
          break;
        }
      }
      
      return {
        slug: filename.replace(/\.mdx$/, ''),
        title: data.title,
        date: data.date,
        description: data.description,
        excerpt: excerpt || data.description,
      };
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export default async function BlogIndex() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dots bg-dots opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 to-white"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="mb-6 inline-block">
              <div className="px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
                ✍️ My Blog
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tight text-slate-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-accent-pink to-accent-peach animate-gradient bg-size-200">
                Thoughts & Stories
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Sharing my journey through tech, life lessons, and everything in between.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <main className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="space-y-8">
            {posts.map((post, index) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group bg-white rounded-3xl shadow-soft border border-purple-100/50 p-8 hover:shadow-purple transition-all duration-500 hover:-translate-y-1 relative overflow-hidden cursor-pointer"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-accent-pink to-accent-peach"></div>
                
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <time 
                        dateTime={post.date}
                        className="text-sm text-slate-500 bg-slate-50 px-3 py-1 rounded-full"
                      >
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </time>
                      <span className="text-purple-300">•</span>
                      <span className="text-sm text-slate-500">5 min read</span>
                    </div>
                    
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                      {post.description}
                    </p>
                    
                    <p className="text-slate-500 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="lg:ml-8 flex-shrink-0">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-accent-pink text-white rounded-full font-medium group-hover:shadow-glow transition-all duration-300 group-hover:-translate-y-1 group/btn">
                      <span className="mr-2">Read More</span>
                      <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50/0 to-pink-50/0 group-hover:from-purple-50/30 group-hover:to-pink-50/30 transition-all duration-500 rounded-3xl pointer-events-none"></div>
              </Link>
            ))}
          </div>
          
          {posts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No posts yet</h3>
              <p className="text-slate-600">Check back soon for new content!</p>
            </div>
          )}
          
          {/* Newsletter Subscription */}
          <div className="mt-20">
            <NewsletterSubscribe />
          </div>
        </div>
      </main>
    </div>
  );
} 