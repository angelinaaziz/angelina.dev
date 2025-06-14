'use client';

import { useEffect, useState } from 'react';

interface ViewCounterProps {
  slug: string;
  className?: string;
}

export default function ViewCounter({ slug, className = '' }: ViewCounterProps) {
  const [views, setViews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trackView = async () => {
      try {
        // First, get current view count
        const getResponse = await fetch(`/api/views/${slug}`);
        const getData = await getResponse.json();
        
        // Then increment the view count
        const postResponse = await fetch(`/api/views/${slug}`, {
          method: 'POST',
        });
        const postData = await postResponse.json();
        
        setViews(postData.views || getData.views || 0);
      } catch (error) {
        console.error('Error tracking view:', error);
        // If API fails, just show 0 views
        setViews(0);
      } finally {
        setIsLoading(false);
      }
    };

    trackView();
  }, [slug]);

  if (isLoading) {
    return (
      <div className={`flex items-center text-slate-500 text-sm ${className}`}>
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span className="animate-pulse">•••</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center text-slate-500 text-sm ${className}`}>
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      <span>{views.toLocaleString()} view{views !== 1 ? 's' : ''}</span>
    </div>
  );
} 