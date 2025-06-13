import { NextRequest, NextResponse } from 'next/server';
import { subscriberService } from '@/lib/supabase';
import { emailService } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const { exists, error: checkError } = await subscriberService.checkEmail(email);
    if (checkError) {
      console.error('Error checking email:', checkError);
      return NextResponse.json(
        { error: 'Failed to check subscription status' },
        { status: 500 }
      );
    }

    if (exists) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      );
    }

    // Add subscriber to database
    const { data: subscriber, error } = await subscriberService.subscribe(email);
    if (error) {
      console.error('Error creating subscriber:', error);
      return NextResponse.json(
        { error: 'Failed to create subscription' },
        { status: 500 }
      );
    }

    // Send welcome email
    const emailSent = await emailService.sendWelcomeEmail(email);
    if (!emailSent) {
      console.error('Failed to send welcome email');
      // Don't fail the request, but log the error
    }

    return NextResponse.json({
      message: 'Successfully subscribed! Check your email for a welcome message.',
      subscriber
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
} 