// Using built-in fetch (Node 18+)

const newsletterContent = {
  subject: "What if my surname wasn't Aziz? 🤔",
  content: `
    <div style="background: #fef7ff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #8b5cf6;">
      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #7c3aed;">Quick question...</p>
    </div>
    
    <p><strong>Do you ever think about how different your life would be if one tiny thing had changed?</strong></p>
    
    <p>I just realized my entire 13-year friendship exists because of... <em>alphabetical order</em>.</p>
    
    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0; border-left: 3px solid #ec4899;">
      <p style="margin: 0; font-style: italic; color: #475569;">
        Year 7 science class. My surname: Aziz. Hers: starts with B.<br/>
        We got seated together purely by chance.
      </p>
    </div>
    
    <p>That random moment completely shaped who we both became. Our personalities, interests, how we handle life - everything.</p>
    
    <p style="font-size: 18px; font-weight: 600; color: #7c3aed; margin: 20px 0;">But what if our surnames had been different? 🦋</p>
    
    <p>We'd probably be completely different people. And that's both terrifying and beautiful.</p>
    
    <p>I wrote about these butterfly effect moments because I think we all have them - we just don't think about them enough.</p>
    
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 8px; padding: 12px; margin: 16px 0; text-align: center;">
      <p style="margin: 0; font-weight: 500; color: #92400e;">
        💭 What random moment completely changed your life?
      </p>
    </div>
  `,
  blogUrl: "https://angelina.dev/blog/the-butterfly-effect-of-alphabetical-seating",
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