import mongoose, { Schema } from 'mongoose';
import { IComment } from './comment.interface';

export interface ICommentModel extends IComment, Document {}

const commentSchema = new Schema(
	{
		user: { type: String, required: true, ref: 'User' },
		comment: { type: String, required: true },
		dataPost: { type: Date, default: Date() },
		stars: { type: Number, max: 5, min: 0 }
	},
	{ timestamps: true }
);

export default mongoose.model<ICommentModel>('Comment', commentSchema);
