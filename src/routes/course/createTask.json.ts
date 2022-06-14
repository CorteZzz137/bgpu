import { makeID } from '$lib/helpers/helpers';
import TaskModel from '$lib/mongoose/models/task';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request, locals }) => {
	const { titleRu, titleEn, decriptionRu, decriptionEn, courseCode } = await request.json();
	try {
		const newTask = new TaskModel({
			title: {
				ru: titleRu,
				en: titleEn,
			},
			decription: {
				ru: decriptionRu,
				en: decriptionEn,
			},
			courseCode,
			taskCode: makeID(10),
			creater: locals.userName,
		});
		await newTask.save();
		return {
			status: 201,
		};
	} catch (error) {
		return {
			status: 500,
			body: JSON.stringify({ message: (error as Error).message }),
		};
	}
};
