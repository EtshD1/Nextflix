import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  imageSrc: string;
  size: "small" | "medium" | "large";
  description: string;
}

const Card = (props: Props) => {
  const { size } = props;
  const [animating, setAnimating] = useState(false);

  const bgDiv = [
    "transition-all",
    "ease-in",
    "duration-300",
    "bg-neutral-900",
    "absolute",
    "group-hover:bottom-0",
    "top-full",
    "-bottom-full",
    "left-0",
    "right-0",
  ];

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
        className={`group relative overflow-y-hidden cursor-pointer rounded-lg ${
          size === "large"
            ? "w-60 h-96"
            : size === "medium"
            ? "w-40 h-72"
            : "w-[23rem] h-52"
        } ${animating ? "z-10" : ""} shadow-2xl`}
      >
        <Image
          src={props.imageSrc}
          alt={`${props.title} image`}
          fill
          sizes={
            size === "large" ? "15rem" : size === "medium" ? "10rem" : "23rem"
          }
          className="object-cover object-center"
        />
        <div
          className={[
            ...bgDiv,
            size === "small"
              ? "group-hover:top-[59.5%]"
              : size === "medium"
              ? "group-hover:top-[50%]"
              : "group-hover:top-[74%]",
          ].join(" ")}
        ></div>
        <div className="p-2 transition-all ease-in-out duration-200 group-hover:duration-500 absolute group-hover:top-0 group-hover:bottom-0 top-full -bottom-full left-0 right-0 flex flex-col justify-end">
          <h4 className="font-bold">{props.title}</h4>
          <p className="text-sm opacity-80">
            {props.description.length > 65
              ? `${props.description.substring(0, 65)}...`
              : props.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
