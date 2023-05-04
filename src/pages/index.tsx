import Banner from "@/components/banner";
import Navbar from "@/components/navbar";
import Section from "@/components/section";
// import getVideos from "@/lib/getVideos";
import { google } from "googleapis";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface PageProps {
  videos: Video[];
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const youtubeKey = process.env.YOUTUBE_API_KEY;
  if (youtubeKey === undefined) throw new Error("Key does not exist");
  const youtube = google.youtube("v3");

  const vids = await youtube.search.list({
    part: ["snippet"],
    q: "Quentin Tarantino",
    maxResults: 5,
    key: youtubeKey,
  });

  return {
    props: {
      videos: vids.data.items!.map((v) => ({
        title: v.snippet!.title!,
        description: v.snippet!.description!,
        imageSrc: v.snippet!.thumbnails!.high!.url!,
      })),
    },
  };
};

const Home = (props: PageProps) => {
  return (
    <main className="min-h-screen py-12">
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
      <Section
        title="Must Watch"
        size="large"
        items={props.videos.map((v, i) => ({ ...v, id: i.toString() }))}
      />
      <Section
        title="Must Watch"
        size="small"
        items={props.videos.map((v, i) => ({ ...v, id: i.toString() }))}
      />
    </main>
  );
};

export default Home;
