import mongoose from 'mongoose';

export interface course {
	title: {
		en: string;
		ru: string;
	};
	creater: string;
	courseCode: string;
}

let coursesSchema = new mongoose.Schema<course>({
	title: {
		en: String,
		ru: String
	},
	creater: String,
	courseCode: String
});

const CoursesModel = mongoose.model<course>('courses', coursesSchema);
export default CoursesModel;
