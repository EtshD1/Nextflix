import { Magic } from "magic-sdk";

const key = process.env.NEXT_PUBLIC_MAGIC_API_KEY;

if (key === undefined) throw new Error("Magic API key is not found");

const magic = () => {
	const m = new Magic(key);
	return m;
};

export default magic;
