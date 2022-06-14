import TaskModel from '$lib/mongoose/models/task';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';
import fs from 'fs';
import { roles } from '$lib/mongoose/models/users';

export const get: RequestHandler = async ({ params, locals }) => {
	const { courseCode, taskCode } = params;

	const task = await TaskModel.findOne({ taskCode }).exec();

	if (locals.role == roles.STUDENT && task) {
		let ownAnswer = task.answers.find((element) => {
			return element.userName === locals.userName;
		});
		if (ownAnswer != undefined) task.answers = [ownAnswer];
		else task.answers = [];
	}

	return {
		status: 200,
		body: JSON.stringify(task)
	};
};
