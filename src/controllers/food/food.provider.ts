import { DEFAULT } from '../../config/constant';
import { logError } from '../../config/logger_helper';
import Provider, { Pagination } from '../../config/provider';
import Food, { IFood, FoodStatus } from '../../models/food.model';

const foodProvider: Provider<IFood> & {
	special1: () => Promise<Pagination<IFood>>;
} = {
	findAll: async (offset: number, limit: number) => {
		try {
			const [foods, total] = await Promise.all([
				Food.find().skip(offset).limit(limit).populate('comments').lean(),
				Food.count()
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
			const foods = await Food.find(search)
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
			const user = await Food.findById(id);
			return user;
		} catch (error) {
			throw logError({ message: 'Get food error', error });
		}
	},
	special1: async () => {
		try {
			const resultSort = await Food.aggregate<IFood>([
				{ $unwind: '$comments' },
				{
					$group: {
						_id: '$_id',
						comments: { $push: '$comments' },
						size: { $sum: 1 }
					}
				},
				{ $sort: { size: 1 } }
			]).limit(5);
			const foods = await Food.populate(resultSort, { path: 'comments' });
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
