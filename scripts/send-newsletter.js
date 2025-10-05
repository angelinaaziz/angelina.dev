// Using built-in fetch (Node 18+)

const newsletterContent = {
  subject: "How we 5x'd revenue with micro-influencers 📈",
  content: `
    <div style="background: #fef7ff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #8b5cf6;">
      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #7c3aed;">New blog post is live!</p>
    </div>
    
    <p><strong>We just 5x'd our revenue in one month by working with TikTokers nobody's heard of.</strong></p>
    
    <p>Quick context: I run a company called Auralyze.ai - an AI interview prep platform. While everyone's chasing big influencers with massive followings, we went the opposite direction and found creators with 2K followers or less who had at least one viral video.</p>
    
    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0; border-left: 3px solid #ec4899;">
      <p style="margin: 0; font-style: italic; color: #475569;">
        <strong>The results:</strong> 3+ million views in a month, 5x revenue growth, and our best creator gained 2K followers with 2 videos over 1 million views each.
      </p>
    </div>
    
    <p>The strategy is surprisingly simple (and involves a lot of doomscrolling on TikTok), but it's working way better than we expected.</p>
    
    <p style="font-size: 18px; font-weight: 600; color: #7c3aed; margin: 20px 0;">Plus we pay them a VERY CHUNKY bonus for viral videos 💰</p>
    
    <p>I break down our entire process - from finding creators to payment structure to what content actually converts.</p>
    
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 8px; padding: 12px; margin: 16px 0; text-align: center;">
      <p style="margin: 0; font-weight: 500; color: #92400e;">
        📱 Perfect timing for anyone looking to scale their content strategy
      </p>
    </div>
  `,
  blogUrl: "https://angelina.dev/blog/how-we-5xd-revenue-with-micro-influencers",
  testEmail: "angelinaaziz1@gmail.com"
};

async function sendTestNewsletter() {
  try {
    console.log('Sending test newsletter...');
    
    const response = await fetch('http://localhost:3000/api/newsletter/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsletterContent)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Test newsletter sent successfully!');
      console.log('Result:', result);
    } else {
      console.error('❌ Failed to send test newsletter:', result);
    }
  } catch (error) {
    console.error('❌ Error sending test newsletter:', error);
  }
}

async function sendToAllSubscribers() {
  try {
    console.log('Sending newsletter to all subscribers...');
    
    const { testEmail, ...contentWithoutTest } = newsletterContent;
    
    const response = await fetch('http://localhost:3000/api/newsletter/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contentWithoutTest)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Newsletter sent to all subscribers!');
      console.log('Result:', result);
    } else {
      console.error('❌ Failed to send newsletter:', result);
    }
  } catch (error) {
    console.error('❌ Error sending newsletter:', error);
  }
}

// Check command line argument
const command = process.argv[2];

if (command === 'test') {
  sendTestNewsletter();
} else if (command === 'send') {
  sendToAllSubscribers();
} else {
  console.log('Usage:');
  console.log('  node scripts/send-newsletter.js test    # Send test email');
  console.log('  node scripts/send-newsletter.js send    # Send to all subscribers');
} 