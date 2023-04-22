import Head from "next/head";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>Nextflix</title>
        <meta
          name="description"
          content="Nextflix - A YouTube port with a Netflix feel."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>NEXTFLIX</h1>
    </main>
  );
};

export default Home;
