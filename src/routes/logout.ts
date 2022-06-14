import { clearUserAuthCookie } from '$lib/auth/verifyUserAuthCookie';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	try {
		return { status: 302, headers: { location: '/', 'set-cookie': clearUserAuthCookie } };
	} catch (error) {
		return { status: 500, body: JSON.stringify({ message: (error as Error).message }) };
	}
};
