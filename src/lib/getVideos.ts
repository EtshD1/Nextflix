import { google } from "googleapis";

const getVideos = async (query: string): Promise<Video[]> => {
  const youtubeKey = process.env.YOUTUBE_API_KEY;
  if (youtubeKey === undefined) throw new Error("Key does not exist");
  const youtube = google.youtube("v3");

  const vids = await youtube.search.list({
    part: ["snippet"],
    q: query,
    maxResults: 5,
    key: youtubeKey,
    type: ["video"],
  });

  const value: Video[] = [];

  vids.data.items &&
    vids.data.items.forEach((v) => {
      v.id &&
        value.push({
          id: v.id.videoId!,
          title: v.snippet!.title!,
          description: v.snippet!.description!,
          imageSrc: v.snippet!.thumbnails!.high
            ? v.snippet?.thumbnails?.high.url!
            : "/static/temp/video_placeholder_small.jpg",
        });
    });

  return value;
};

export default getVideos;
