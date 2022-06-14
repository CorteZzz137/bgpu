import type { RequestHandler } from '@sveltejs/kit';
import bcryptjs from 'bcryptjs';
import UserModel from '$lib/mongoose/models/users';
import { createUserAuthCookie } from '$lib/auth/verifyUserAuthCookie';

export type LoginBody = { userNameOrEmail: string; password: string };

export const post: RequestHandler = async ({ request }) => {
	const { userNameOrEmail, password } = await request.json();
	try {
		const userLean = await UserModel.findOne({
			$or: [{ userName: userNameOrEmail }, { email: userNameOrEmail }]
		})
			.collation({ locale: 'en', strength: 2 })
			.select('_id userName passwordHash salt')
			.lean();
		if (!userLean || userLean.passwordHash !== bcryptjs.hashSync(password, userLean.salt))
			return { status: 401 };

		return {
			status: 200,
			headers: { 'set-cookie': createUserAuthCookie(userLean._id.toString()) }
		};
	} catch (error: any) {
		return { status: 500, body: JSON.stringify({ message: (error as Error).message }) };
	}
};
