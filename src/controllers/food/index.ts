import provider from './food.provider';
import { Request, Response } from 'express';
import { IFood } from '../../models/food.model';
import { statusCode } from '../../helpers/constant';

// Route create User
const getPopularFood = async (req: Request, res: Response) => {
	try {
		const result = await provider.findByAttribute!(
			{},
			{
				sort: { finalRate: -1, name: 1 },
				limit: 10, // total of list
				offset: 0
			}
		);
		return res.status(statusCode.success.CREATED).json(result);
	} catch (error) {
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json(error);
	}
};

const getRegulation = async (req: Request, res: Response) => {
	try {
		const result = await provider.special1();
		return res.status(statusCode.success.CREATED).json(result);
	} catch (error) {
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json(error);
	}
};

const getFood = async (req: Request, res: Response) => {
	try {
		const foodId = req.params.foodId;
		const food = await provider.findById!(foodId);
		if (!food) {
			return res
				.status(statusCode.error.NOT_FOUND)
				.json({ message: 'Not found' });
		}
		return res.status(statusCode.success.OK).json(food);
	} catch (error) {
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json(error);
	}
};

export default { getPopularFood, getRegulation, getFood };
