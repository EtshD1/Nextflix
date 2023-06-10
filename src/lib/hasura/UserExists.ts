import { fetchAdminGraphQL } from "./Server";

interface IResponseData {
	data: {
		user_by_pk: {
			email: string;
			issuer: string;
			publicAddress: string;
		} | null;
	};
}

const operation = `
  query GetUser($issuer: String!) {
    user_by_pk(issuer: $issuer) {
      email
      issuer
      publicAddress
    }
  }
`;

export const UserExists = async (id: string) => {
	try {
		const res = (await fetchAdminGraphQL({
			operationsDoc: operation,
			operationName: "GetUser",
			variables: { issuer: id },
		})) as IResponseData;
		return res.data !== null;
	} catch (err) {
		console.error(err);
		return false;
	}
};
