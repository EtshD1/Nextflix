import { Magic_Admin } from "@/lib/magicAdmin";
import { NextApiHandler } from "next";
import jwt from "jsonwebtoken";
import { UserExists } from "@/lib/hasura/UserExists";
import { CreateUser } from "@/lib/hasura/CreateUser";
import { setTokenCookie } from "@/lib/setCookie";

const JWT_SECRET = process.env.JWT_SECRET;

if (JWT_SECRET === undefined) throw new Error("JWT Secret is not found");

const LoginAPI: NextApiHandler = async (req, res) => {
	if (req.method !== "POST")
		return res.status(405).json({
			done: false,
		});

	const didtoken = req.body.token;

	if (didtoken === undefined)
		return res.status(400).json({
			done: false,
		});

	const now = Math.floor(Date.now() / 1000);

	const metadata = await Magic_Admin.users.getMetadataByToken(didtoken);

	if (metadata.issuer === null)
		return res.status(400).json({
			done: false,
		});

	const userExist = await UserExists(metadata.issuer);

	if (!userExist)
		await CreateUser({
			issuer: metadata.issuer,
			email: metadata.email!,
			publicAddress: metadata.publicAddress!,
		});

	const accessToken = jwt.sign(
		{
			iat: now,
			exp: now + 7 * 24 * 60 * 60,
			"https://hasura.io/jwt/claims": {
				"x-hasura-default-role": "user",
				"x-hasura-allowed-roles": ["user", "admin"],
				"x-hasura-user-id": metadata.issuer,
			},
		},
		JWT_SECRET,
		{
			algorithm: "HS256",
		}
	);

	setTokenCookie(accessToken, res);

	return res.json({
		done: true,
	});
};

export default LoginAPI;
