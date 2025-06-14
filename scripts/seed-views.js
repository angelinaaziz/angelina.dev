// Using built-in fetch (Node 18+)

// Realistic view counts based on posts
const seedViews = {
  "did-i-just-start-a-blog": 450,
  "im-turning-24-and-i-dont-feel-young-anymore": 2800, // This one blew up on Reddit
  "25-before-25": 320,
  "the-butterfly-effect-of-alphabetical-seating": 50, // New post, just published
};

async function seedViewCounts() {
  console.log('Seeding view counts for existing blog posts...');
  
  for (const [slug, targetViews] of Object.entries(seedViews)) {
    try {
      console.log(`Setting ${slug} to ${targetViews} views...`);
      
      // We'll make multiple POST requests to increment the counter
      // This simulates organic growth rather than just setting a number
      let currentViews = 0;
      const batchSize = 50; // Process in batches to avoid overwhelming the server
      
      while (currentViews < targetViews) {
        const remaining = targetViews - currentViews;
        const thisBatch = Math.min(batchSize, remaining);
        
        // Make multiple requests in parallel for this batch
        const requests = Array(thisBatch).fill().map(() => 
          fetch(`http://localhost:3000/api/views/${slug}`, {
            method: 'POST',
          })
        );
        
        await Promise.all(requests);
        currentViews += thisBatch;
        
        console.log(`  ${slug}: ${currentViews}/${targetViews} views`);
        
        // Small delay between batches
        if (currentViews < targetViews) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      console.log(`✅ ${slug} seeded with ${targetViews} views`);
      
    } catch (error) {
      console.error(`❌ Error seeding views for ${slug}:`, error);
    }
  }
  
  console.log('\n🎉 View count seeding complete!');
}

// Check command line argument
const command = process.argv[2];

if (command === 'seed') {
  seedViewCounts();
} else {
  console.log('Usage:');
  console.log('  node scripts/seed-views.js seed    # Seed view counts for existing posts');
  console.log('\nNote: Make sure your dev server is running on localhost:3000');
} 