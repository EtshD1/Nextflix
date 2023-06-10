interface IParams {
	operationsDoc: string;
	operationName: string;
	variables?: Record<string, any>;
}

const HASURA_URL = process.env.NEXT_PUBLIC_HASURA_URL;

if (HASURA_URL === undefined) throw new Error("Hasura DB url is not found");

const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_KEY;

if (HASURA_ADMIN_SECRET === undefined)
	throw new Error("Hasura secret is not found");

export const fetchAdminGraphQL = async ({
	operationsDoc,
	operationName,
	variables = {},
}: IParams) => {
	const result = await fetch(HASURA_URL, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			"x-hasura-admin-secret": HASURA_ADMIN_SECRET,
		},
		body: JSON.stringify({
			query: operationsDoc,
			variables,
			operationName,
		}),
	});
	return await result.json();
};
