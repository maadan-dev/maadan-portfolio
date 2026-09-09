import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Yekeen Maadan - Software Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #050505, #111111)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #333',
            borderRadius: '24px',
            padding: '60px',
            background: 'rgba(255, 255, 255, 0.05)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              margin: '0 0 20px 0',
              textAlign: 'center',
              background: 'linear-gradient(to right, #ffffff, #a1a1aa)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Yekeen Maadan
          </h1>
          <p
            style={{
              fontSize: '36px',
              margin: '0 0 40px 0',
              color: '#a1a1aa',
              textAlign: 'center',
            }}
          >
            Software Developer
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px 24px',
              borderRadius: '999px',
              fontSize: '24px',
              color: '#10b981',
            }}
          >
            maadan.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
