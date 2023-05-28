import Navbar from "@/components/navbar";
import getVideoById from "@/lib/getVideoById";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface Props {
	video: Video | false;
}

export const getServerSideProps: GetServerSideProps<Props> = async (params) => {
	const video = await getVideoById(params.query.videoId!.toString());

	return {
		props: {
			video,
		},
	};
};

const VideoPage = (props: Props) => {
	return (
		<div className="h-screen flex items-center justify-center">
			<Head>
				<title>
					{props.video
						? `Nextflix - ${props.video.title}`
						: "Nextflix - Video is not found"}
				</title>
			</Head>
			<Navbar />
			{props.video ? (
				<div className="container mx-auto">
					<div className="text-lg font-medium">
						{props.video.title}
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
