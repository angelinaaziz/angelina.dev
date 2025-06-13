import { NextRequest, NextResponse } from 'next/server';
import { subscriberService } from '@/lib/supabase';
import { emailService } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Check environment variables first
    const requiredEnvVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      GMAIL_EMAIL: process.env.GMAIL_EMAIL,
      GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
    };

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      console.error('Missing environment variables:', missingVars);
      return NextResponse.json(
        { error: `Server configuration error: Missing ${missingVars.join(', ')}` },
        { status: 500 }
      );
    }

    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    console.log('Checking email subscription status for:', email);

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

    console.log('Adding subscriber to database:', email);

    // Add subscriber to database
    const { data: subscriber, error } = await subscriberService.subscribe(email);
    if (error) {
      console.error('Error creating subscriber:', error);
      return NextResponse.json(
        { error: 'Failed to create subscription' },
        { status: 500 }
      );
    }

    console.log('Subscriber added successfully, sending welcome email');

    // Send welcome email
    const emailSent = await emailService.sendWelcomeEmail(email);
    if (!emailSent) {
      console.error('Failed to send welcome email');
      // Don't fail the request, but log the error
    }

    console.log('Newsletter subscription completed successfully for:', email);

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