'use client';

import { useState } from 'react';

export default function NewsletterInline() {
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
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-100 my-6 sm:my-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex-1 lg:mr-4">
          <div className="flex items-center mb-2">
            <span className="text-lg sm:text-xl mr-2">💌</span>
            <h4 className="text-base sm:text-lg font-semibold text-slate-800">
              Enjoyed this post?
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Subscribe to get notified of new posts!
          </p>
        </div>

        <div className="w-full lg:w-80 lg:flex-shrink-0">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-3 py-2.5 sm:py-2 text-sm bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              disabled={status === 'loading' || status === 'success'}
              required
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`px-4 py-2.5 sm:py-2 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap transform hover:scale-105 active:scale-95 ${
                status === 'success'
                  ? 'bg-green-500 text-white cursor-default hover:scale-100'
                  : status === 'loading'
                  ? 'bg-slate-400 text-white cursor-not-allowed hover:scale-100'
                  : 'bg-gradient-to-r from-purple-600 to-accent-pink text-white hover:shadow-lg'
              }`}
            >
              {status === 'loading' && '⏳'}
              {status === 'success' && '✓'}
              {status === 'idle' && 'Subscribe'}
              {status === 'error' && 'Try Again'}
            </button>
          </form>

          {message && (
            <div
              className={`text-xs mt-2 p-2 rounded transition-all duration-300 ${
                status === 'success'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 