import { logError } from '../../config/logger_helper';
import Provider from '../../config/provider';
import { FoodModel } from '../../models';
import { IFood } from '../../models/foods/food.interface';

class FoodProvider extends Provider<IFood> {
	constructor() {
		super(FoodModel);
	}

	public async get_top_6_food_review() {
		try {
			const resultSort = await FoodModel.aggregate([
				{ $unwind: '$comments' },
				{
					$group: {
						_id: '$_id',
						comments: { $push: '$comments' },
						totalComment: { $sum: 1 },
						name: { $first: '$name' },
						imgs: { $first: '$imgs' },
						timePrepare: { $first: '$timePrepare' },
						finalRate: { $first: '$finalRate' },
						status: { $first: '$status' },
						description: { $first: '$description' },
						price: { $first: '$price' }
					}
				},
				{ $sort: { totalComment: 1, createAt: -1, name: -1 } }
			]).limit(6);
			const foods = await FoodModel.populate(resultSort, {
				path: 'comments',
				populate: { path: 'user', select: { name: 1, avatar: 1 } }
			});
			return {
				total: Math.min(6, foods.length),
				limit: 6,
				offset: 0,
				datas: foods
			};
		} catch (error) {
			throw logError({ message: 'Get food error', error });
		}
	}
}

export default new FoodProvider();
