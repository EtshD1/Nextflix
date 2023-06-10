import { fetchAdminGraphQL } from "./Server";

interface IResponseData {
	data: {
		insert_user: {
			returning: [
				{
					email: string;
					issuer: string;
					publicAddress: string;
				}
			];
		};
	};
}

interface IParams {
	email: string;
	issuer: string;
	publicAddress: string;
}

const operation = `
	mutation CreateUser($email: String!, $issuer: String!, $publicAddress: String!) {
		insert_user(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
			returning {
				email
				issuer
				publicAddress
			}
		}
	}
`;

export const CreateUser = async (params: IParams) => {
	try {
		const res = (await fetchAdminGraphQL({
			operationsDoc: operation,
			operationName: "GetUser",
			variables: params,
		})) as IResponseData;
		return res.data !== null;
	} catch (err) {
		console.error(err);
		return false;
	}
};
