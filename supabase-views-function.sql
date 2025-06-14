-- Function to increment blog post views
CREATE OR REPLACE FUNCTION increment_views(post_slug TEXT)
RETURNS INTEGER AS $$
DECLARE
  new_views INTEGER;
BEGIN
  -- Insert or update the view count
  INSERT INTO blog_views (slug, views, updated_at)
  VALUES (post_slug, 1, NOW())
  ON CONFLICT (slug)
  DO UPDATE SET 
    views = blog_views.views + 1,
    updated_at = NOW()
  RETURNING views INTO new_views;
  
  RETURN new_views;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 