// Using built-in fetch (Node 18+)

const newsletterContent = {
  subject: "New post: Default Mode Was Killing Me",
  content: `
    <p>For 151 days, I let default mode run my life. Easy choices. Path of least resistance.</p>
    
    <p>Over the last 20 days, I've been turning that around. New job at V7 Labs, a daily checklist I actually stick to, and finally booking the hobbies I've been putting off for years.</p>
    
    <p>This one's personal.</p>
  `,
  blogUrl: "https://angelina.dev/blog/171-days-into-24",
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
