import './globals.css';

export const metadata = {
  title: 'Chirp - Real-time Chat',
  description: 'A real-time chat application built with Next.js and Ably',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover, height=device-height',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, height=device-height" />
      </head>
      <body>{children}</body>
    </html>
  );
}
