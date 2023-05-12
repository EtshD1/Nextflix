import Banner from "@/components/banner";
import Navbar from "@/components/navbar";
import Section from "@/components/section";
import getVideos from "@/lib/getVideos";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface PageProps {
  sections: {
    title: string;
    size: CardSize;
    videos: Video[];
  }[];
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const vids = await Promise.all([
    // getVideos("Inglourious Basterds"),
    // getVideos("Django Unchained"),
    // getVideos("Once upon a time in hollywood"),
  ]);

  return {
    props: {
      sections: [
        // {
        //   title: "Inglourious Basterds",
        //   size: "large",
        //   videos: vids[0],
        // },
        // {
        //   title: "Django Unchained",
        //   size: "medium",
        //   videos: vids[1],
        // },
        // {
        //   title: "Once upon a time in hollywood",
        //   size: "small",
        //   videos: vids[2],
        // },
      ],
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
      <header>
        <Navbar />
      </header>
      <Banner
        title="Inglourious Basterds"
        subtitle="In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same."
        image="/static/temp/banner_image.jpg"
      />
      {props.sections.map((s, i) => {
        return (
          <Section
            key={`${s}:${i}`}
            size={s.size}
            title={s.title}
            items={s.videos}
          />
        );
      })}
    </main>
  );
};

export default Home;
