import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface Props {
	size: CardSize;
	title: string;
	imageSrc: string;
	description: string;
	id: string;
}

const Card = (props: Props) => {
	const { size } = props;
	const [animating, setAnimating] = useState(false);

	return (
		<Link href={`/video/${props.id}`}>
			<motion.div
				whileHover={{
					scale: 1.1,
					zIndex: 40,
				}}
				initial={{ zIndex: animating ? 30 : 20 }}
				onAnimationStart={() => setAnimating(true)}
				onAnimationComplete={() => setAnimating(false)}
				transition={{
					type: "spring",
					stiffness: 260,
					damping: 20,
					duration: 10000,
				}}
				className="group relative bg-gradient-to-b from-black to-neutral-950 rounded-lg shadow-2xl shadow-black flex flex-col gap-2"
			>
				<div
					className={`relative overflow-y-hidden cursor-pointer rounded-t-lg lg:rounded-lg ${
						size === "large"
							? "w-80 h-44 lg:w-[27.5rem] lg:h-60"
							: size === "medium"
							? "w-80 h-44"
							: "w-60 h-28"
					}`}
				>
					<Image
						src={props.imageSrc}
						alt={`${props.title} image`}
						fill
						sizes={
							size === "large"
								? "30rem"
								: size === "medium"
								? "15.5rem"
								: "25.5rem"
						}
						className="object-cover object-center"
					/>
				</div>
				<div className="z-50 transition-all ease-in-out duration-200 overflow-y-hidden group-hover:duration-500 lg:absolute group-hover:top-0 top-full bottom-0 left-0 right-0 flex flex-col justify-end">
					<div className="bg-neutral-950 lg:bg-opacity-70 lg:p-2">
						<h4
							dangerouslySetInnerHTML={{
								__html:
									props.title.length > 40
										? props.title.substring(0, 40) + "..."
										: props.title,
							}}
							className="font-medium"
						></h4>
						{props.size === "large" && (
							<p className="lg:block hidden text-sm opacity-80">
								{props.description.length > 65
									? `${props.description.substring(0, 65)}...`
									: props.description}
							</p>
						)}
					</div>
				</div>
			</motion.div>
		</Link>
	);
};

export default Card;
