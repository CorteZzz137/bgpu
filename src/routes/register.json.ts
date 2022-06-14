import { createUserAuthCookie } from '$lib/auth/verifyUserAuthCookie';
import UserModel, { roles, type user } from '$lib/mongoose/models/users';
import type { RequestHandler } from '@sveltejs/kit';
import bcryptjs from 'bcryptjs';

export type RegisterBody = {
	userName: string;
	name: string;
	role: roles;
	email: string;
	password: string;
	passwordConfirm: string;
};

export function usernameIsValid(username: string): boolean {
	// 1. Username consists of alphanumeric characters (a-zA-Z0-9), lowercase, or uppercase
	// 2. Username special cahracters allowed: underscore (_)
	// 3. The underscore (_) must not be the first or last character.
	// 4. The underscore (_) does not appear consecutively, e.g., java__regex
	// 5. The number of characters must be between 3 to 16
	return /^[a-zA-Z0-9]([_](?![_])|[a-zA-Z0-9]){1,14}[a-zA-Z0-9]$/.test(username);
}

export function emailIsValid(email: string): boolean {
	// must be in the format _@_._
	// checks that @ is not entered twice e.g. _@_@._
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function passwordIsValid(password: string): boolean {
	return password.length < 64;
}

export const usernameIsAvailable = async (userName: string): Promise<boolean> => {
	const value = userName.trim().toLowerCase();

	const userLean = await UserModel.findOne({ userName: value })
		.collation({ locale: 'en', strength: 2 })
		.select('_id')
		.lean();
	if (userLean) return false;

	return true;
};

export const post: RequestHandler = async ({ request }) => {
	const { userName, name, role, email, password, passwordConfirm } = <RegisterBody>(
		await request.json()
	);
	try {
		if (!usernameIsValid(userName))
			return { status: 400, body: { message: 'Your username is invalid!' } };
		if (!emailIsValid(email))
			return { status: 400, body: { message: 'Your email is invalid!' } };
		if (password !== passwordConfirm)
			return { status: 400, body: { message: 'Your passwords do not match!' } };

		const isPasswordValid = passwordIsValid(password);
		if (!isPasswordValid)
			return { status: 400, body: { message: 'Your password is invalid!' } };

		const usernameIsOk = await usernameIsAvailable(userName);
		if (!usernameIsOk) return { status: 400, body: { message: 'Username not available.' } };

		const salt = bcryptjs.genSaltSync();

		const userModel = new UserModel<user>({
			userName,
			name,
			email,
			role,
			passwordHash: bcryptjs.hashSync(password, salt),
			salt: salt
		});

		await userModel.save();
		return {
			status: 201,
			headers: { 'set-cookie': createUserAuthCookie(userModel._id.toString()) }
		};
	} catch (error: any) {
		// Mongodb duplicate key exception
		if (error?.code === 11000) {
			const duplicateKey = Reflect.ownKeys(error?.keyPattern).filter(
				(key): key is string => typeof key === 'string'
			)[0];
			return {
				status: 400,
				body: {
					message:
						duplicateKey.slice(0, 1).toUpperCase() +
						duplicateKey.slice(1) +
						' already registered.'
				}
			};
		}
		return { status: 500, body: JSON.stringify({ message: (error as Error).message }) };
	}
};
