import CoursesModel from '$lib/mongoose/models/courses';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params, locals }) => {
	const { courseCode } = params;

	if (courseCode.length !== 10) {
		return {
			status: 404,
		};
	}

	try {
		const res = await CoursesModel.findOne({ courseCode: courseCode }).lean();

		return {
			result: 200,
			body: JSON.stringify(res),
		};
	} catch (error) {
		return {
			status: 500,
			body: {
				error: "Server can't find this course",
			},
		};
	}
};
