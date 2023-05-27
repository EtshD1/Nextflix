import Image from "next/image";

interface Props {
	setMouseIn: (param: boolean) => void;
	handleLogout: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavDropdownMenu = ({ setMouseIn, handleLogout }: Props) => {
	return (
		<div className="relative">
			<div
				onMouseLeave={() => setMouseIn(false)}
				onMouseEnter={() => setMouseIn(true)}
				className="absolute right-0 top-4 -bottom-20 bg-black bg-opacity-80 w-48 border border-white border-solid border-opacity-25"
			>
				<ul className="flex flex-col h-full">
					<li className="grow px-4 flex gap-2 items-center hover:underline">
						<div>
							<Image
								width={24}
								height={24}
								alt="User Icon"
								src="/icons/user.svg"
							/>
						</div>
						<div>View Profile</div>
					</li>
					<li className="opacity-25 flex">
						<div className="pb-[1px] grow bg-gradient-to-r from-transparent to-white"></div>
						<div className="pb-[1px] grow bg-gradient-to-l from-transparent to-white"></div>
					</li>
					<li className="grow items-center flex">
						<a
							onClick={handleLogout}
							className="px-4 flex gap-2 hover:underline text-red-600"
						>
							<div>
								<Image
									width={24}
									height={24}
									alt="User Icon"
									src="/icons/signout.svg"
								/>
							</div>
							<div>Sign Out</div>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default NavDropdownMenu;
