import * as cookie from 'cookie';
import '$lib/mongoose/connection';
import type { Handle, GetSession } from '@sveltejs/kit';
import UserModel from '$lib/mongoose/models/users';
import { verifyUserAuthCookie } from '$lib/auth/verifyUserAuthCookie';

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({ event, resolve }) => {
	let userId = await verifyUserAuthCookie(event.request.headers.get('cookie'));
	if (userId) {
		const user = await UserModel.findById(userId).select('name email role userName').lean();
		event.locals.userId = userId;
		event.locals.userName = user?.userName;
		event.locals.name = user?.name;
		event.locals.email = user?.email;
		event.locals.role = user?.role;
	}

	const response = await resolve(event);

	return response;
};

export const getSession: GetSession = (request) => ({
	userName: request.locals.userName,
	name: request.locals.name,
	email: request.locals.email,
	role: request.locals.role
});
