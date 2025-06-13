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
  }
}; 