import { makeID } from '$lib/helpers/helpers';
import type { course } from '$lib/mongoose/models/courses';
import CoursesModel from '$lib/mongoose/models/courses';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request, locals }) => {
	const { titleRu, titleEn } = await request.json();
	try {
		const newCourse = new CoursesModel({
			title: {
				ru: titleRu,
				en: titleEn
			},
			creater: locals.userName,
			courseCode: makeID(10)
		});
		await newCourse.save();
		return {
			status: 200
		};
	} catch (error) {
		return {
			status: 500,
			body: JSON.stringify({ message: (error as Error).message })
		};
	}
};
