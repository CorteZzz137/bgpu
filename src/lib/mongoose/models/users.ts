import mongoose from 'mongoose';

export enum roles {
	STUDENT = 0,
	TEACHER,
	ADMIN
}

export interface user {
	name: string;
	userName: string;
	email: string;
	role: roles;
	passwordHash: string;
	salt: string;
}

export const userSchema = new mongoose.Schema<user>({
	name: String,
	userName: String,
	email: String,
	role: Number,
	passwordHash: String,
	salt: String
});

const UserModel = mongoose.model<user>('user', userSchema);
export default UserModel;
