import mongoose, { Schema } from 'mongoose';
import { number } from 'yup';

export interface IComment {
	user: String;
	comment: String;
	datePost: Date;
	stars: number;
}

export interface ICommentModel extends IComment, Document {}

const commentSchema = new Schema(
	{
		user: { type: String, required: true, ref: 'Food' },
		comment: { type: String, required: true },
		dataPost: { type: Date, default: Date() },
		stars: { type: number, max: 5, min: 0 }
	},
	{ timestamps: true }
);

export default mongoose.model<ICommentModel>('Comment', commentSchema);
