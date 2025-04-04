import Link from 'next/link';
import { FaHome, FaSadTear, FaRandom } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-dots bg-dots opacity-50 pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white rounded-3xl shadow-soft border border-purple-100 p-10 text-center">
          <div className="mb-6 inline-block animate-float">
            <div className="px-6 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
              404 Error
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-800 mb-4">
            Oops!{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-accent-pink to-accent-peach">
              Page Not Found
            </span>
          </h1>
          
          <div className="my-10 flex justify-center">
            <div className="text-9xl animate-bounce-subtle opacity-80 text-accent-pink">
              <FaSadTear />
            </div>
          </div>
          
          <p className="text-xl text-slate-700 mb-10 max-w-2xl mx-auto">
            Looks like you've ventured into uncharted digital territory! This page has either been moved, deleted, or never existed in the first place.
          </p>
          
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/"
              className="px-8 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-all duration-300 shadow-purple hover:-translate-y-2 hover:shadow-glow text-sm uppercase tracking-wider inline-flex items-center"
            >
              <FaHome className="mr-2" /> Back to Home
            </Link>
            <Link
              href="/projects"
              className="px-8 py-3 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-all duration-300 shadow-soft hover:-translate-y-2 hover:shadow-purple border border-purple-200 text-sm uppercase tracking-wider inline-flex items-center"
            >
              <FaRandom className="mr-2" /> Explore Projects
            </Link>
          </div>
          
          <div className="h-1.5 w-32 bg-gradient-to-r from-purple-500 to-accent-pink rounded-full mt-10 mx-auto"></div>
        </div>
      </div>
    </div>
  );
} 