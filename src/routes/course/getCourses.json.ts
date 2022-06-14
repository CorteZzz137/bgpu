import CoursesModel from '$lib/mongoose/models/courses';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const get: RequestHandler = async ({ locals, url }) => {
	let type = url.searchParams.get('type');
	const userName = locals.userName;
	if (type == 'all') {
		return {
			status: 200,
			body: JSON.stringify(await CoursesModel.find().lean()),
		};
	} else {
		return {
			status: 200,
			body: JSON.stringify(await CoursesModel.find().lean()),
		};
	}
};
