import nodemailer from 'nodemailer';

// Create reusable transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Email settings
const FROM_NAME = 'Angelina Aziz 🚀';
const FROM_EMAIL = process.env.GMAIL_EMAIL!;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://angelina.dev';

// Validate required settings
if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
  console.error('Missing required Gmail settings:', {
    user: !process.env.GMAIL_EMAIL ? 'missing' : 'set',
    pass: !process.env.GMAIL_APP_PASSWORD ? 'missing' : 'set',
  });
}

export const emailService = {
  // Send newsletter email
  async sendNewsletterEmail(email: string, subject: string, content: string, blogUrl: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: { name: FROM_NAME, address: FROM_EMAIL },
        to: email,
        subject,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>${subject}</title>
          </head>
          <body style="font-family: -apple-system, sans-serif; line-height: 1.5; color: #334155; max-width: 600px; margin: 0 auto; padding: 16px;">
            <!-- Header -->
            <div style="border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px;">
              <p style="color: #8b5cf6; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0;">New from Angelina</p>
              <h1 style="color: #1e293b; margin: 0; font-size: 24px; font-weight: 700;">${subject}</h1>
            </div>
            
            <!-- Main Content -->
            <div style="color: #475569; font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
              ${content}
            </div>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 32px 0 24px;">
              <a href="${blogUrl}" 
                 style="display: inline-block; background: #8b5cf6; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                Read the full post →
              </a>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 13px; margin: 0 0 4px 0;">
                Made with 💜 by <a href="${SITE_URL}" style="color: #8b5cf6; text-decoration: none; font-weight: 500;">Angelina</a>
              </p>
              <p style="color: #94a3b8; font-size: 12px; margin: 8px 0 0;">
                Changed your mind? <a href="${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}" style="color: #8b5cf6; text-decoration: none;">Unsubscribe here</a>
              </p>
            </div>
          </body>
          </html>
        `,
        text: `
${subject}

${content.replace(/<[^>]*>/g, '')}

Read the full post: ${blogUrl}

Made with 💜 by Angelina
${SITE_URL}

Changed your mind? Unsubscribe: ${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}
        `,
      };

      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending newsletter email:', error);
      return false;
    }
  },

  // Send welcome email
  async sendWelcomeEmail(email: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: { name: FROM_NAME, address: FROM_EMAIL },
        to: email,
        subject: '💜 Welcome to My Newsletter!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Welcome to My Newsletter!</title>
          </head>
          <body style="font-family: -apple-system, sans-serif; line-height: 1.5; color: #334155; max-width: 600px; margin: 0 auto; padding: 16px;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); border-radius: 16px 16px 0 0; padding: 32px 24px; text-align: center; margin-bottom: 0;">
              <div style="font-size: 40px; margin-bottom: 12px;">💌</div>
              <h1 style="color: white; margin: 0 0 8px 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                Hey there! 👋
              </h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0; font-weight: 500;">
                Thanks for trusting me with your inbox space!
              </p>
            </div>
            
            <!-- Main Content -->
            <div style="background: white; padding: 24px; border: 1px solid #f1f5f9; border-top: none; border-radius: 0 0 16px 16px;">
              <p style="color: #475569; font-size: 15px; line-height: 1.5; margin: 0 0 16px 0;">
                So you decided to subscribe to my blog. Honestly? Pretty good call on your part. 😊 I write about whatever's currently consuming my brain space, which tends to be:
              </p>
              
              <!-- Feature List -->
              <div style="margin: 16px 0; background: #f8fafc; border-radius: 12px; padding: 16px;">
                <div style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                  <span style="color: #8b5cf6; font-size: 16px; margin-right: 8px; font-weight: 600; line-height: 1.4;">⚡</span>
                  <div>
                    <span style="color: #374151; font-size: 14px; font-weight: 500;">Platform engineering stuff</span>
                    <br/>
                    <span style="color: #6b7280; font-size: 13px;">The technical rabbit holes I fall into</span>
                  </div>
                </div>
                
                <div style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                  <span style="color: #8b5cf6; font-size: 16px; margin-right: 8px; font-weight: 600; line-height: 1.4;">💭</span>
                  <div>
                    <span style="color: #374151; font-size: 14px; font-weight: 500;">Random life lessons</span>
                    <br/>
                    <span style="color: #6b7280; font-size: 13px;">I probably learned the hard way</span>
                  </div>
                </div>
                
                <div style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                  <span style="color: #8b5cf6; font-size: 16px; margin-right: 8px; font-weight: 600; line-height: 1.4;">🤓</span>
                  <div>
                    <span style="color: #374151; font-size: 14px; font-weight: 500;">Whatever I'm hyper-fixated on</span>
                    <br/>
                    <span style="color: #6b7280; font-size: 13px;">My friends call these "info dumps"</span>
                  </div>
                </div>
                
                <div style="display: flex; align-items: flex-start;">
                  <span style="color: #8b5cf6; font-size: 16px; margin-right: 8px; font-weight: 600; line-height: 1.4;">📝</span>
                  <div>
                    <span style="color: #374151; font-size: 14px; font-weight: 500;">Career & startup thoughts</span>
                    <br/>
                    <span style="color: #6b7280; font-size: 13px;">Productivity tips I may or may not follow myself</span>
                  </div>
                </div>
              </div>
              
              <!-- Warning Box -->
              <div style="background: #fef3c7; border-radius: 8px; padding: 12px 16px; margin: 16px 0; border-left: 3px solid #f59e0b;">
                <p style="color: #92400e; font-size: 13px; margin: 0; font-style: italic;">
                  Fair warning: I write like I talk, which means you're getting the unfiltered version of my thoughts. Consider yourself warned. 🙃
                </p>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 24px 0 16px;">
                <a href="${SITE_URL}/blog" 
                   style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 6px rgba(139, 92, 246, 0.2);">
                  Check out my latest posts →
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 13px; margin: 0 0 4px 0;">
                Made with 💜 by <a href="${SITE_URL}" style="color: #8b5cf6; text-decoration: none; font-weight: 500;">Angelina</a>
              </p>
              <p style="color: #94a3b8; font-size: 12px; margin: 8px 0 0;">
                Changed your mind? <a href="${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}" style="color: #8b5cf6; text-decoration: none;">Unsubscribe here</a>
              </p>
            </div>
          </body>
          </html>
        `,
        text: `
Hey there! 👋

Thanks for trusting me with your inbox space! So you decided to subscribe to my blog. Honestly? Pretty good call on your part.

I write about:
⚡ Platform engineering stuff - The technical rabbit holes I fall into
💭 Random life lessons - I probably learned the hard way
🤓 Whatever I'm hyper-fixated on - My friends call these "info dumps"
📝 Career & startup thoughts - Productivity tips I may or may not follow myself

Fair warning: I write like I talk, which means you're getting the unfiltered version of my thoughts. Consider yourself warned. 🙃

Check out my latest posts: ${SITE_URL}/blog

Made with 💜 by Angelina
${SITE_URL}

Changed your mind? Unsubscribe: ${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}
        `,
      };

      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return false;
    }
  }
}; 