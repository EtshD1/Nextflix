import Banner from "@/components/banner";
import Navbar from "@/components/navbar";
import Head from "next/head";

const Home = () => {
  return (
    <main className="min-h-screen pt-12">
      <Head>
        <title>Nextflix</title>
        <meta
          name="description"
          content="Nextflix - A YouTube port with a Netflix feel."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Banner
        title="Inglourious Basterds"
        subtitle="In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same."
        image="/static/temp/banner_image.jpg"
      />
    </main>
  );
};

export default Home;
