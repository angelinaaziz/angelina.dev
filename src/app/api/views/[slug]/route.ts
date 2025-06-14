import { NextRequest, NextResponse } from 'next/server';
import { viewsService } from '@/lib/supabase';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// GET /api/views/[slug] - Get view count for a blog post
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;
    
    const { views, error } = await viewsService.getViews(slug);
    
    if (error) {
      console.error('Error getting views:', error);
      return NextResponse.json({ views: 0 }, { status: 200 });
    }

    return NextResponse.json({ views });
  } catch (error) {
    console.error('Views API error:', error);
    return NextResponse.json({ views: 0 }, { status: 200 });
  }
}

// POST /api/views/[slug] - Increment view count for a blog post
export async function POST(request: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;
    
    const { views, error } = await viewsService.incrementViews(slug);
    
    if (error) {
      console.error('Error incrementing views:', error);
      return NextResponse.json({ views: 0 }, { status: 200 });
    }

    return NextResponse.json({ views });
  } catch (error) {
    console.error('Views increment API error:', error);
    return NextResponse.json({ views: 0 }, { status: 200 });
  }
} 