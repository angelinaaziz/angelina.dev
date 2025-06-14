import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

// Newsletter subscriber service
export const subscriberService = {
  // Add a new subscriber
  async subscribe(email: string): Promise<{ data: Subscriber | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .insert([
          { 
            email: email.toLowerCase().trim(),
            subscribed_at: new Date().toISOString(),
            is_active: true,
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error subscribing:', error);
      return { data: null, error };
    }
  },

  // Check if email exists
  async checkEmail(email: string): Promise<{ exists: boolean; error: any }> {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('id, is_active')
        .eq('email', email.toLowerCase().trim())
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }

      return { exists: !!data && data.is_active, error: null };
    } catch (error) {
      console.error('Error checking email:', error);
      return { exists: false, error };
    }
  },

  // Unsubscribe
  async unsubscribe(email: string): Promise<{ success: boolean; error: any }> {
    try {
      const { error } = await supabase
        .from('subscribers')
        .update({ is_active: false })
        .eq('email', email.toLowerCase().trim());

      if (error) throw error;
      return { success: true, error: null };
    } catch (error) {
      console.error('Error unsubscribing:', error);
      return { success: false, error };
    }
  },

  // Get all active subscribers
  async getAllActiveSubscribers(): Promise<{ data: string[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('email')
        .eq('is_active', true);

      if (error) throw error;
      return { data: data?.map(sub => sub.email) || [], error: null };
    } catch (error) {
      console.error('Error getting subscribers:', error);
      return { data: null, error };
    }
  }
};

// Blog views service
export const viewsService = {
  // Get view count for a blog post
  async getViews(slug: string): Promise<{ views: number; error: any }> {
    try {
      const { data, error } = await supabase
        .from('blog_views')
        .select('views')
        .eq('slug', slug)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }

      return { views: data?.views || 0, error: null };
    } catch (error) {
      console.error('Error getting views:', error);
      return { views: 0, error };
    }
  },

  // Increment view count for a blog post
  async incrementViews(slug: string): Promise<{ views: number; error: any }> {
    try {
      // Try using the RPC function first
      const { data, error } = await supabase.rpc('increment_views', { post_slug: slug });

      if (error) {
        console.log('RPC function not available, using upsert fallback');
        // Fallback to upsert if RPC function doesn't exist
        const { data: existingData } = await supabase
          .from('blog_views')
          .select('views')
          .eq('slug', slug)
          .single();

        const currentViews = existingData?.views || 0;
        const newViews = currentViews + 1;

        const { data: upsertData, error: upsertError } = await supabase
          .from('blog_views')
          .upsert(
            { 
              slug, 
              views: newViews,
              updated_at: new Date().toISOString()
            },
            { onConflict: 'slug' }
          )
          .select('views')
          .single();

        if (upsertError) throw upsertError;
        return { views: upsertData?.views || newViews, error: null };
      }

      return { views: data || 1, error: null };
    } catch (error) {
      console.error('Error incrementing views:', error);
      return { views: 1, error };
    }
  }
}; 