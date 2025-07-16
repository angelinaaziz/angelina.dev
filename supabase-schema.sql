-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  confirmation_token UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_token ON subscribers(confirmation_token);

-- Enable Row Level Security (RLS)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Allow anonymous users to insert (for subscriptions)
CREATE POLICY "Allow anonymous subscriptions" ON subscribers
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow anonymous users to read their own subscription status
CREATE POLICY "Allow reading own subscription" ON subscribers
  FOR SELECT TO anon
  USING (true);

-- Allow anonymous users to update confirmation status
CREATE POLICY "Allow confirmation updates" ON subscribers
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

-- Create a function to clean up old unconfirmed subscriptions
CREATE OR REPLACE FUNCTION cleanup_unconfirmed_subscriptions()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM subscribers 
  WHERE status = 'pending' 
    AND created_at < NOW() - INTERVAL '24 hours';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql; 

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Blog views table
CREATE TABLE IF NOT EXISTS blog_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) NOT NULL,
  views INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(slug)
);

-- Enable row level security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_views ENABLE ROW LEVEL SECURITY;

-- Create policies for subscribers (read-only for anonymous users)
CREATE POLICY "Enable read access for all users" ON subscribers FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON subscribers FOR UPDATE USING (true);

-- Create policies for blog views (read-only for anonymous users, insert/update for service)
CREATE POLICY "Enable read access for all users" ON blog_views FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON blog_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON blog_views FOR UPDATE USING (true); 