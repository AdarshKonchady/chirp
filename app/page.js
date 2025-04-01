import Head from 'next/head';
import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('../components/Chat'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Chirp - Real-time Chat</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>

      <main>
        <h1 className="title">
          <span className="title-icon">💬</span> Chirp Chat
        </h1>
        <Chat />
      </main>

      <footer>
        <p> {new Date().getFullYear()} Chirp Chat • Real-time Messaging</p>
      </footer>
    </div>
  );
}
