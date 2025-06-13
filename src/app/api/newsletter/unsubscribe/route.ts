import { NextRequest } from 'next/server';
import { subscriberService } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return redirect('/blog?error=invalid-unsubscribe-link');
    }

    // Unsubscribe
    const { success, error } = await subscriberService.unsubscribe(email);
    
    if (error || !success) {
      console.error('Error unsubscribing:', error);
      return redirect('/blog?error=unsubscribe-failed');
    }

    // Redirect to success page
    return redirect('/blog?unsubscribed=true');

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return redirect('/blog?error=unsubscribe-failed');
  }
} 