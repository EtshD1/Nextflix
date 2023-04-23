import Image from "next/image";

interface Props {
  title: string;
  subtitle: string;
  image: string;
}

const Banner = (props: Props) => {
  return (
    <div className="flex p-4 lg:p-8 min-h-[40rem]">
      <div className="relative flex basis-full flex-col justify-end">
        <div className="absolute top-0 left-0 right-0 bottom-12 lg:bottom-0 rounded-lg overflow-hidden">
          <Image
            src={props.image}
            alt={`${props.title} cover image`}
            fill
            sizes=""
            className="object-cover object-top z-10"
          />
          <div className="absolute bg-gradient-to-b lg:bg-gradient-to-l lg:opacity-60 from-transparent to-black top-[60%] lg:top-0 left-0 right-0 bottom-0 z-20"></div>
        </div>
        <div className="flex flex-col lg:w-[31rem] gap-3 p-6 lg:pr-0 lg:pl-8 py-8 relative z-30">
          <h3 className="font-black text-2xl lg:text-3xl">{props.title}</h3>
          <p className="opacity-90">{props.subtitle}</p>
          <div className="flex gap-4">
            <button className="bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded font-bold flex gap-2 pr-5 pl-4 py-1 transition-all ease-in">
              <span>
                <Image
                  alt="Play Icon"
                  height={24}
                  width={24}
                  src="/icons/play_arrow.svg"
                />
              </span>
              <span>Watch</span>
            </button>
            <button className="text-white bg-white bg-opacity-30 hover:bg-opacity-20 transition-all ease-in rounded font-bold flex gap-2 pr-5 pl-4 py-1">
              <span>
                <Image
                  alt="Play Icon"
                  height={24}
                  width={24}
                  src="/icons/info.svg"
                />
              </span>
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
