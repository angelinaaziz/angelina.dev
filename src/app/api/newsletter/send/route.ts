import { NextRequest, NextResponse } from 'next/server';
import { subscriberService } from '@/lib/supabase';
import { emailService } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { subject, content, blogUrl, testEmail } = await request.json();

    if (!subject || !content || !blogUrl) {
      return NextResponse.json(
        { error: 'Subject, content, and blogUrl are required' },
        { status: 400 }
      );
    }

    // If testEmail is provided, send only to that email
    if (testEmail) {
      console.log('Sending test newsletter to:', testEmail);
      const emailSent = await emailService.sendNewsletterEmail(testEmail, subject, content, blogUrl);
      
      if (!emailSent) {
        return NextResponse.json(
          { error: 'Failed to send test email' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: 'Test email sent successfully!',
        recipient: testEmail
      });
    }

    // Get all active subscribers
    const { data: subscribers, error } = await subscriberService.getAllActiveSubscribers();
    
    if (error) {
      console.error('Error getting subscribers:', error);
      return NextResponse.json(
        { error: 'Failed to get subscribers' },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { message: 'No active subscribers found' },
        { status: 200 }
      );
    }

    console.log(`Sending newsletter to ${subscribers.length} subscribers`);

    // Send emails to all subscribers
    const results = await Promise.allSettled(
      subscribers.map(email => 
        emailService.sendNewsletterEmail(email, subject, content, blogUrl)
      )
    );

    const successful = results.filter(result => result.status === 'fulfilled' && result.value === true).length;
    const failed = results.length - successful;

    console.log(`Newsletter sent: ${successful} successful, ${failed} failed`);

    return NextResponse.json({
      message: 'Newsletter sent!',
      total: subscribers.length,
      successful,
      failed
    });

  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      { error: 'Failed to send newsletter' },
      { status: 500 }
    );
  }
} 