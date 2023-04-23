const ExpandableMenu = (props: { active: boolean }) => {
  return (
    <ul
      className={`flex flex-col gap-0 ${
        props.active ? "opacity-100" : "opacity-0"
      } transition-all duration-150 md:hidden`}
    >
      <li className="py-2 cursor-pointer">Home</li>
      <li className="opacity-25 flex">
        <div className="pb-[1px] grow bg-gradient-to-r from-transparent to-white"></div>
        <div className="pb-[1px] grow bg-gradient-to-l from-transparent to-white"></div>
      </li>
      <li className="py-2 cursor-pointer">My List</li>
    </ul>
  );
};

export default ExpandableMenu;
