import UserModel from '$lib/mongoose/models/users';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	const { userName } = params;

	const user = await UserModel.findOne({ userName: new RegExp(`^${userName}$`, 'i') });
	if (!user)
		return {
			status: 500,
			body: {
				error: 'Server could not return games data'
			}
		};
	return {
		status: 200,
		body: JSON.stringify(user)
	};
};
