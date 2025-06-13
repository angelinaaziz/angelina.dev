import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get parameters from URL
    const title = searchParams.get('title') || 'Angelina Aziz';
    const subtitle = searchParams.get('subtitle') || 'Platform Engineer & Builder';
    const type = searchParams.get('type') || 'website';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%)',
            fontFamily: 'Inter, sans-serif',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
          
          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px',
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            {/* Rocket Emoji */}
            <div
              style={{
                fontSize: '80px',
                marginBottom: '20px',
              }}
            >
              🚀
            </div>
            
            {/* Title */}
            <h1
              style={{
                fontSize: type === 'blog' ? '48px' : '64px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 16px 0',
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                lineHeight: 1.1,
                maxWidth: '900px',
              }}
            >
              {title}
            </h1>
            
            {/* Subtitle */}
            <p
              style={{
                fontSize: '28px',
                color: 'rgba(255,255,255,0.9)',
                margin: '0 0 24px 0',
                fontWeight: 500,
                maxWidth: '800px',
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </p>
            
            {/* Domain */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50px',
                padding: '12px 24px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              <span
                style={{
                  fontSize: '20px',
                  color: 'white',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                angelina.dev
              </span>
            </div>
          </div>
          
          {/* Bottom Decoration */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #f59e0b, #8b5cf6)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 