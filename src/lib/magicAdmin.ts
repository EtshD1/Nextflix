import { Magic } from "@magic-sdk/admin";

const MAGIC_ADMIN_KEY = process.env.MAGIC_ADMIN_KEY;

if (MAGIC_ADMIN_KEY === undefined)
	throw new Error("Magic admin key is not found");

export const Magic_Admin = new Magic(MAGIC_ADMIN_KEY);
