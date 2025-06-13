-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  confirmation_token UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE
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