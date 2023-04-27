import Banner from "@/components/banner";
import Navbar from "@/components/navbar";
import Section from "@/components/section";
import Head from "next/head";

const vids = [
  {
    title: "Inglourious Basterds",
    imageSrc: "/static/temp/card_image.jpg",
    description:
      "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
  },
  {
    title: "Inglourious Basterds",
    imageSrc: "/static/temp/card_image.jpg",
    description:
      "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
  },
  {
    title: "Inglourious Basterds",
    imageSrc: "/static/temp/card_image.jpg",
    description:
      "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
  },
  {
    title: "Inglourious Basterds",
    imageSrc: "/static/temp/card_image.jpg",
    description:
      "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
  },
  {
    title: "Inglourious Basterds",
    imageSrc: "/static/temp/card_image.jpg",
    description:
      "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
  },
  {
    title: "Inglourious Basterds",
    imageSrc: "/static/temp/card_image.jpg",
    description:
      "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
  },
  {
    title: "Inglourious Basterds",
    imageSrc: "/static/temp/card_image.jpg",
    description:
      "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
  },
  {
    title: "Inglourious Basterds",
    imageSrc: "/static/temp/card_image.jpg",
    description:
      "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
  },
  {
    title: "Inglourious Basterds",
    imageSrc: "/static/temp/card_image.jpg",
    description:
      "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
  },
];

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
      <Section
        title="Must Watch"
        size="large"
        items={vids.map((v, i) => ({ ...v, id: i.toString() }))}
      />
      <Section
        title="Must Watch"
        size="medium"
        items={vids.map((v, i) => ({ ...v, id: i.toString() }))}
      />
      <Section
        title="Must Watch"
        size="small"
        items={vids.map((v, i) => ({ ...v, id: i.toString() }))}
      />
    </main>
  );
};

export default Home;
