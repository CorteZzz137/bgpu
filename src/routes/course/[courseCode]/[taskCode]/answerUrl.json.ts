import TaskModel from '$lib/mongoose/models/task';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ params, request }) => {
	const { courseCode, taskCode } = params;
	const { userName, url, text } = await request.json();

	try {
		let answer = await TaskModel.findOne({ taskCode, 'answers.userName': userName });
		if (answer) {
			await TaskModel.findOneAndUpdate(
				{ taskCode, 'answers.userName': userName },
				{
					$set: {
						'answers.$.url': url.includes('https://') ? url : 'https://' + url,
						'answers.$.name': text
					}
				}
			);
		} else {
			answer = await TaskModel.findOne({ taskCode });

			if (answer) {
				answer.answers.push({
					userName: userName,
					url: url.includes('https://') ? url : 'https://' + url,
					name: text
				});
				await answer.save();
			}
		}
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
