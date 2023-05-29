type CardSize = "small" | "medium" | "large";
interface Video {
	id: string;
	title: string;
	imageSrc: string;
	description: string;
}

interface VideoWithEmbedded {
	id: string;
	title: string;
	imageSrc: string;
	description: string;
	embeddedVideo: string;
	channel: string;
	views: string;
}
