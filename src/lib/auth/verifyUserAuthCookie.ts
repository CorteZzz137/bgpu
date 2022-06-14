import { jwtValidityDays, jwtSecret } from '$lib/config/dotenv';
import jwt from 'jsonwebtoken';
import cookie, { type CookieSerializeOptions } from 'cookie';
import { dev } from '$app/env';

export const verifyUserAuthCookie = (cookieString: string | null): Promise<string | undefined> =>
	new Promise((resolve) => {
		if (!cookieString) resolve(undefined);
		jwt.verify(cookie.parse(cookieString || '').authToken, jwtSecret, {}, (err, payload) => {
			if (
				!err &&
				payload &&
				typeof payload !== 'string' &&
				payload.exp &&
				payload.exp > Date.now() / 1000
			)
				resolve(<string>payload.userId);
			resolve(undefined);
		});
	});

export const cookieSerializeOptions: CookieSerializeOptions = {
	domain: undefined,
	encode: undefined,
	httpOnly: true,
	path: '/',
	sameSite: 'lax',
	secure: dev ? false : true
};

export const createUserAuthCookie = (userId: string): string => {
	const maxAge = 60 * 60 * 24 * jwtValidityDays;
	const expires = new Date();
	expires.setUTCSeconds(expires.getUTCSeconds() + maxAge);

	const token = jwt.sign({ userId }, jwtSecret, { expiresIn: maxAge });
	return cookie.serialize('authToken', token, { ...cookieSerializeOptions, expires, maxAge });
};

export const clearUserAuthCookie = cookie.serialize('authToken', '', {
	...cookieSerializeOptions,
	expires: new Date(0),
	maxAge: 0
});
