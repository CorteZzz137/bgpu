import mongoose from 'mongoose';

export interface task {
	title: {
		ru: string;
		en: string;
	};
	decription: {
		ru: string;
		en: string;
	};
	courseCode: string;
	taskCode: string;
	creater: string;
	taskFile: {
		name: string;
		url: string;
	};
	answers: {
		userName: string;
		name: string;
		url: string;
	}[];
}

const answerSchema = new mongoose.Schema<{ userName: String; name: String; url: String }>(
	{
		userName: String,
		name: String,
		url: String,
	},
	{ _id: false },
);

export const taskSchema = new mongoose.Schema<task>({
	title: {
		ru: String,
		en: String,
	},
	decription: {
		ru: String,
		en: String,
	},
	courseCode: String,
	taskCode: String,
	creater: String,
	taskFile: {
		name: String,
		url: String,
	},
	answers: [answerSchema],
});

const TaskModel = mongoose.model<task>('tasks', taskSchema);
export default TaskModel;
