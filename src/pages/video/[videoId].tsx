import Navbar from "@/components/navbar";
import getVideoById from "@/lib/getVideoById";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface Props {
	video: VideoWithEmbedded | false;
}

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [],
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
	const video =
		context.params !== undefined &&
		(await getVideoById(context.params!.videoId!.toString()));

	return {
		props: {
			video: video,
		},
		revalidate: 10,
	};
};

const VideoPage = (props: Props) => {
	const localViews = (views: string) => {
		const viewsAsNumber = parseInt(views);

		if (isNaN(viewsAsNumber)) return views;

		const billion = 1000000000,
			million = 1000000,
			thousand = 1000;

		if (viewsAsNumber >= billion) {
			const billions = Math.floor(viewsAsNumber / billion);
			const millions = Math.floor((viewsAsNumber % billion) / 100000000);
			return `${billions}${millions === 0 ? "" : `.${millions}`}B`;
		}
		if (viewsAsNumber >= million) {
			const millions = Math.floor(viewsAsNumber / million);
			const thousands = Math.floor((viewsAsNumber % million) / 100000);
			return `${millions}${thousands === 0 ? "" : `.${thousands}`}M`;
		}
		if (viewsAsNumber >= thousand) {
			const thousands = Math.floor(viewsAsNumber / thousand);
			const hundreds = Math.floor((viewsAsNumber % thousand) / 100);
			return `${thousands}${hundreds === 0 ? "" : `.${thousands}`}K`;
		}
		return viewsAsNumber;
	};

	return (
		<div className="h-screen flex items-center justify-center pt-32 px-8">
			<Head>
				<title>
					{props.video
						? `Nextflix - ${props.video.title}`
						: "Nextflix - Video is not found"}
				</title>
			</Head>
			<Navbar />
			{props.video ? (
				<div className="container mx-auto flex flex-col gap-4 pb-8">
					<div className="w-full flex">
						<iframe
							id="ytplayer"
							typeof="text/html"
							className="w-full h-56 sm:h-72 md:h-80 lg:h-[30rem] 2xl:h-[36rem] outline-none rounded-lg shadow-md shadow-gray-800"
							height="unset"
							src={`https://www.youtube.com/embed/${props.video.id}?autoplay=0`}
						></iframe>
					</div>
					<div className="text-2xl font-medium">
						{props.video.title}
					</div>
					<div className="sm:flex justify-between">
						<div>{localViews(props.video.views)} Views</div>
						<div>{props.video.channel}</div>
					</div>
					<div className="text-sm opacity-75">
						{props.video.description}
					</div>
				</div>
			) : (
				<div>Video is not found</div>
			)}
		</div>
	);
};

export default VideoPage;
