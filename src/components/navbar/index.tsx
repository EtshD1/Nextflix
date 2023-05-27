import { useEffect, useState } from "react";
import ExpandableMenu from "./ExpandableMenu";
import ExpandableProfile from "./ExpandableProfile";
import MainInfo from "./MainInfo";
import magic from "@/lib/magic";
import { useRouter } from "next/router";

interface Props {}

const Navbar = ({}: Props) => {
	const [active, setActive] = useState(false);
	const [username, setUsername] = useState<string>();
	const [scrollOff, setScrollOff] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const m = magic();
		m.user.isLoggedIn().then((res) => {
			res &&
				m.user
					.getMetadata()
					.then((user) => {
						user.email && setUsername(user.email);
					})
					.catch((err) => {
						console.error(err);
					});
		});
	}, []);

	const m = typeof window !== "undefined" && magic();

	const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		m &&
			m.user.logout().then((res) => {
				if (res) {
					console.log({ logout: res });
					router.push("/login");
				}
			});
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY >= 48) return setScrollOff(true);
			return setScrollOff(false);
		};

		window.addEventListener("scroll", handleScroll);

		window.addEventListener("load", () => {
			if (window.scrollY >= 48) return setScrollOff(true);
		});

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMenu = () => setActive((_) => !_);

	return (
		<nav
			className={`${
				active ? "h-64" : "h-12"
			} md:overflow-visible overflow-hidden duration-500 transition-all ease-out px-4 lg:px-8 fixed top-0 left-0 right-0 z-50 flex flex-col justify-between`}
		>
			<div
				className={`bg-gradient-to-tr from-neutral-900 to-black
        ${
			active || scrollOff ? "opacity-100" : "opacity-0"
		} top-0 bottom-0 left-0 right-0 absolute -z-10 duration-500 transition-all ease-out`}
			></div>
			<MainInfo
				handleLogout={handleLogout}
				username={username}
				toggleMenu={toggleMenu}
			/>
			{username && (
				<>
					<ExpandableMenu active={active} />
					<ExpandableProfile
						username={username}
						handleLogout={handleLogout}
					/>
				</>
			)}
		</nav>
	);
};

export default Navbar;
