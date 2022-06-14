import TaskModel from '$lib/mongoose/models/task';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ params, request }) => {
	const { courseCode, taskCode } = params;
	const { url, text } = await request.json();

	try {
		await TaskModel.findOneAndUpdate(
			{ taskCode },
			{
				taskFile: {
					url: url.includes('https://') ? url : 'https://' + url,
					name: text
				}
			}
		);
	} catch (error) {
		return {
			status: 500,
			body: JSON.stringify({ message: (error as Error).message })
		};
	}

	return {
		status: 200
	};
};
