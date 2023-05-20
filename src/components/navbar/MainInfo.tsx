import { Bebas_Neue } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NavDropdownMenu from "./DropdownMenu";
import magic from "@/lib/magic";

interface Props {
  toggleMenu: () => void;
}

const Logo_Font = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

const MainInfo = (props: Props) => {
  const [mouseIn, setMouseIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const m = magic();
    m.user.getMetadata()
      .then(user => {
        user.email && setUsername(user.email);
      })
      .catch(err => {
        console.error(err);
      })
  }, []);

  useEffect(() => {
    if (!activeMenu && mouseIn) setActiveMenu(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!mouseIn) {
      const timeoutId = setTimeout(() => setActiveMenu(false), 750);
      timeoutRef.current = timeoutId;
    }
  }, [mouseIn, timeoutRef.current, activeMenu]);

  return (
    <div className="flex justify-between items-center h-12">
      <div className="flex gap-6 items-center h-12">
        <div className={`text-red-600 ${Logo_Font.className} text-3xl`}>
          NEXTFLIX
        </div>
        <ul className="md:flex gap-4 hidden">
          <li className="hover:font-bold hover:underline">Home</li>
          <li className="hover:font-bold hover:underline">My List</li>
        </ul>
      </div>
      <div>
        <button className="md:hidden p-3" onClick={props.toggleMenu}>
          <Image
            alt="Menu Icon"
            src="/icons/menu.svg"
            height={24}
            width={24}
          />
        </button>
        <div className="md:block hidden relative">
          <div
            className="flex items-center gap-1"
            onMouseLeave={() => setMouseIn(false)}
            onMouseEnter={() => setMouseIn(true)}
          >
            <div>{username}</div>
            <Image
              src="/icons/expand_arrow.svg"
              alt="Expand Arrow Icons"
              className={`w-4 h-4 transition-all ease-out duration-300 ${activeMenu ? "rotate-180" : ""
                }`}
              sizes="1rem"
              width={16}
              height={16}
            />
          </div>
          {activeMenu && <NavDropdownMenu setMouseIn={setMouseIn} />}
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
