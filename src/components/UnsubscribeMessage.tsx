'use client';

import { useEffect, useState } from 'react';

export default function UnsubscribeMessage() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Get URL parameters on client side
    const urlParams = new URLSearchParams(window.location.search);
    const unsubscribed = urlParams.get('unsubscribed');
    const error = urlParams.get('error');

    if (unsubscribed === 'true') {
      setMessage({
        type: 'success',
        text: "You've been successfully unsubscribed from the newsletter. Sorry to see you go! 👋"
      });
    } else if (error === 'unsubscribe-failed') {
      setMessage({
        type: 'error',
        text: "There was an issue unsubscribing you. Please try again or contact me directly."
      });
    } else if (error === 'invalid-unsubscribe-link') {
      setMessage({
        type: 'error',
        text: "Invalid unsubscribe link. Please check your email for the correct link."
      });
    }
  }, []);

  useEffect(() => {
    // Clear the message after 8 seconds
    if (message) {
      const timer = setTimeout(() => setMessage(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
      <div className={`
        px-6 py-4 rounded-lg shadow-lg border max-w-md mx-auto
        ${message.type === 'success' 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-red-50 border-red-200 text-red-800'
        }
      `}>
        <div className="flex items-center gap-3">
          <span className="text-lg">
            {message.type === 'success' ? '✅' : '❌'}
          </span>
          <p className="font-medium">{message.text}</p>
          <button
            onClick={() => setMessage(null)}
            className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
} 