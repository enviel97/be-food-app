import { DEFAULT } from '../../config/constant';
import { logError } from '../../config/logger_helper';
import Provider, { Pagination } from '../../config/provider';
import { FoodModel } from '../../models';
import { IFood } from '../../models/foods/food.interface';

const foodProvider: Provider<IFood> & {
	special1: () => Promise<Pagination<IFood>>;
} = {
	findAll: async (offset: number, limit: number) => {
		try {
			const [foods, total] = await Promise.all([
				FoodModel.find().skip(offset).limit(limit).populate('comments').lean(),
				FoodModel.count()
			]);
			return { limit, offset, total, datas: foods };
		} catch (error) {
			throw logError({ message: 'Get foods error', error });
		}
	},
	findByAttribute: async (search, options) => {
		try {
			const sort = options.sort ?? {};
			const offset = options.offset ?? DEFAULT.OFFSET;
			const limit = options.limit ?? DEFAULT.LIMIT;
			const foods = await FoodModel.find(search)
				.sort(sort)
				.skip(offset)
				.limit(limit)
				.populate('comments')
				.lean();
			return { limit, offset, total: Math.min(foods.length, 10), datas: foods };
		} catch (error) {
			throw logError({ message: 'Get foods error', error });
		}
	},
	findById: async (id: String) => {
		try {
			const user = await FoodModel.findById(id);
			return user;
		} catch (error) {
			throw logError({ message: 'Get food error', error });
		}
	},
	special1: async () => {
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
				{ $sort: { totalComment: 1 } }
			]).limit(6);
			const foods = await FoodModel.populate(resultSort, {
				path: 'comments',
				populate: { path: 'user', select: { name: 1, avatar: 1 } }
			});
			return {
				total: Math.min(5, foods.length),
				limit: 5,
				offset: 0,
				datas: foods
			};
		} catch (error) {
			throw logError({ message: 'Get food error', error });
		}
	}
};

export default foodProvider;
