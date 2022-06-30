import mongoose, { Schema, Document } from 'mongoose';
import { FoodStatus, IFood } from './food.interface';

export interface IFoodModel extends IFood, Document {}

const foodSchema = new Schema(
	{
		name: { type: String, required: true },
		imgs: { type: [String], required: true, default: [] },
		comments: { type: [String], default: [], ref: 'Comment' },
		timePrepare: { type: Number, default: 15, min: 0 },
		finalRate: { type: Number, default: 0.0 },
		status: { type: String, enum: FoodStatus, default: FoodStatus.normal },
		description: { type: String, required: true },
		price: { type: Number, default: 0.0 }
	},
	{ timestamps: true }
);

export default mongoose.model<IFoodModel>('Food', foodSchema);
