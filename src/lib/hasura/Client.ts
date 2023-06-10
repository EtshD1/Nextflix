interface IParams {
	operationsDoc: string;
	operationName: string;
	variables?: Record<string, any>;
	auth: string;
}

const HASURA_URL = process.env.NEXT_PUBLIC_HASURA_URL;

if (HASURA_URL === undefined) throw new Error("Hasura DB url is not found");

export const fetchGraphQL = async ({
	operationsDoc,
	operationName,
	variables = {},
	auth,
}: IParams) => {
	const result = await fetch(HASURA_URL, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			Authorition: auth,
		},
		body: JSON.stringify({
			query: operationsDoc,
			variables,
			operationName,
		}),
	});
	return await result.json();
};
