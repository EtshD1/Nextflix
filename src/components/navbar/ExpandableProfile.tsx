import Image from "next/image";

const ExpandableProfile = () => {
  return (
    <div className="shrink-0 pb-4 md:hidden">
      <div className="bg-white bg-opacity-25 rounded-full flex justify-between items-center">
        <div className="p-2 flex gap-4">
          <div>
            <div className="font-bold">User Name</div>
            <div className="opacity-80">View Profile</div>
          </div>
        </div>
        <div className="flex gap-1 h-16 items-center pr-1">
          <div className="opacity-25 flex flex-col h-full shrink-0">
            <div className="pl-[1px] grow bg-gradient-to-b from-transparent to-white"></div>
            <div className="pl-[1px] grow bg-gradient-to-t from-transparent to-white"></div>
          </div>
          <button className="flex items-center justify-center h-12 w-12">
            <div className="relative p-4">
              <Image
                src="/icons/signout.svg"
                alt="Sign out Icon"
                fill
                sizes="2rem"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpandableProfile;
