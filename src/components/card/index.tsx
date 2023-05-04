import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

type Props = { size: CardSize } & Video;

const Card = (props: Props) => {
  const { size } = props;
  const [animating, setAnimating] = useState(false);

  return (
    <div>
      <motion.div
        whileHover={{
          scale: 1.1,
          zIndex: 40,
        }}
        onAnimationStart={() => setAnimating(true)}
        onAnimationComplete={() => setAnimating(false)}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 10000,
        }}
        className={`group relative overflow-y-hidden cursor-pointer rounded-lg ${size === "large"
            ? "w-[27.5rem] h-60"
            : size === "short"
              ? "w-56 h-96"
              : "w-[23rem] h-52"
          } ${animating ? "z-10" : ""} shadow-2xl`}
      >
        <Image
          src={props.imageSrc}
          alt={`${props.title} image`}
          fill
          sizes={
            size === "large"
              ? "30rem"
              : size === "short"
                ? "15.5rem"
                : "25.5rem"
          }
          className="object-cover object-center"
        />
        <div className="transition-all ease-in-out duration-200 group-hover:duration-500 absolute group-hover:top-0 group-hover:bottom-0 top-full -bottom-full left-0 right-0 flex flex-col justify-end">
          <div className="bg-neutral-950 bg-opacity-70 p-2">
            <h4 className="font-bold">{props.title}</h4>
            <p className="text-sm opacity-80">
              {props.description.length > 65
                ? `${props.description.substring(0, 65)}...`
                : props.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
