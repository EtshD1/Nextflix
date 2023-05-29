import { google } from "googleapis";

const getVideoById = async (
	query: string
): Promise<VideoWithEmbedded | false> => {
	const youtubeKey = process.env.YOUTUBE_API_KEY;
	if (youtubeKey === undefined) throw new Error("Key does not exist");
	const youtube = google.youtube("v3");

	const vids = await youtube.videos.list({
		key: youtubeKey,
		id: [query],
		part: ["snippet", "player", "statistics"],
	});

	if (vids.data.items === undefined || vids.data.items.length === 0)
		return false;

	const v = vids.data.items[0];

	const value: VideoWithEmbedded = {
		description: v.snippet!.description!,
		id: v.id!,
		imageSrc: v.snippet!.thumbnails!.high
			? v.snippet?.thumbnails?.high.url!
			: v.snippet!.thumbnails!.medium
			? v.snippet!.thumbnails!.medium.url!
			: v.snippet!.thumbnails!.standard
			? v.snippet!.thumbnails!.standard.url!
			: "/static/temp/video_placeholder_small.jpg",
		title: v.snippet!.title!,
		embeddedVideo: v.player!.embedHtml!,
		channel: v.snippet!.channelTitle!,
		views: v.statistics!.viewCount!,
	};

	return value;
};

export default getVideoById;
