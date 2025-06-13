'use client';

import { useState } from 'react';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing! Please check your email to confirm.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
      <div className="text-center mb-6">
        <div className="inline-block mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-accent-pink rounded-full flex items-center justify-center text-white text-2xl">
            📧
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Subscribe to My Newsletter
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Get notified when I publish new blog posts and share insights about tech, life, and everything in between.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-6 py-4 bg-white border border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-800 placeholder-slate-400 transition-all duration-300"
            disabled={status === 'loading'}
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className={`w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-accent-pink text-white rounded-2xl font-medium transition-all duration-300 ${
            status === 'loading'
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:shadow-lg hover:-translate-y-0.5'
          }`}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>

        {message && (
          <div
            className={`text-sm ${
              status === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
} 