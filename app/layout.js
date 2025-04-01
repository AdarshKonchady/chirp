import './globals.css';

export const metadata = {
  title: 'Chirp - Real-time Chat',
  description: 'A real-time chat application built with Next.js and Ably',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0f0f0f" />
      </head>
      <body>{children}</body>
    </html>
  );
}
