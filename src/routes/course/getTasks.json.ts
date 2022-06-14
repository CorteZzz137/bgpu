import TaskModel from '$lib/mongoose/models/task';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const get: RequestHandler = async ({ url, locals }) => {
	let courseCode = url.searchParams.get('courseCode');

	return {
		status: 200,
		body: JSON.stringify(await TaskModel.find({ courseCode }).lean())
	};
};
