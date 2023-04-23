import { useState } from "react";
import ExpandableMenu from "./ExpandableMenu";
import ExpandableProfile from "./ExpandableProfile";
import MainInfo from "./MainInfo";

const Navbar = () => {
  const [active, setActive] = useState(false);

  const toggleMenu = () => setActive((_) => !_);

  return (
    <nav
      className={`${active ? "h-64" : "h-12"} ${
        active ? "bg-black" : ""
      } md:overflow-visible overflow-hidden duration-500 transition-all ease-out px-4 lg:px-8 fixed top-0 left-0 right-0 z-50 flex flex-col justify-between`}
    >
      <MainInfo toggleMenu={toggleMenu} />
      <ExpandableMenu active={active} />
      <ExpandableProfile />
    </nav>
  );
};

export default Navbar;
