import { Model, Document } from 'mongoose';
import { DEFAULT } from './constant';
import { logError } from './logger_helper';

export interface Pagination<T> {
	total: number;
	offset: number;
	limit: number;
	datas: T[];
}

export interface Options {
	limit?: number;
	offset?: number;
	/** -1 for descending order and 1 for ascending */

	sort?: any;
}

export default abstract class Provider<T = any> {
	public readonly totalItem: number;
	private name: String;
	constructor(readonly model: Model<T & Document>) {
		this.totalItem = -1;
		this.name = model.modelName.toLocaleLowerCase();
	}

	public async findById(id: String): Promise<T | null> {
		try {
			const result = await this.model.findById(id);
			return result;
		} catch (error) {
			throw logError({ message: `Get ${this.name} error`, error });
		}
	}

	public async findOne(search: any): Promise<T | null> {
		try {
			const result = await this.model.findOne(search).lean();
			return result as T;
		} catch (error) {
			throw logError({ message: `Get ${this.name} error`, error });
		}
	}

	public async findByAttribute(
		search: any,
		options: Options = {}
	): Promise<Pagination<T>> {
		try {
			const sort = options.sort ?? {};
			const offset = options.offset ?? DEFAULT.OFFSET;
			const limit = options.limit ?? DEFAULT.LIMIT;
			const datas = await this.model
				.find(search)
				.sort(sort)
				.skip(offset)
				.limit(limit)
				.lean();

			return {
				limit,
				offset,
				total: datas.length,
				datas: datas as T[]
			};
		} catch (error) {
			throw logError({ message: `Get ${this.name} error`, error });
		}
	}

	public async findAll(offset: number, limit: number): Promise<Pagination<T>> {
		try {
			const [datas, total] = await Promise.all([
				this.model.find().skip(offset).limit(limit).populate('comments').lean(),
				this.totalItem < 0 ? this.model.count() : this.totalItem
			]);
			return { limit, offset, total, datas: datas as T[] };
		} catch (error) {
			throw logError({ message: `Get ${this.name} error`, error });
		}
	}

	public async create(data: T): Promise<T> {
		const _schema = new this.model({ ...data });

		try {
			const result = await _schema.save();
			return result as T;
		} catch (error) {
			throw logError({ message: `Create ${this.name} error`, error });
		}
	}

	public async updateById(id: String, data: any): Promise<T | null> {
		try {
			const result = await this.model.findByIdAndUpdate(id, data, {
				new: true
			});
			return result;
		} catch (error) {
			throw logError({
				message: `Update ${this.name} error`,
				error
			});
		}
	}

	public async updateByAttribute(search: any, update: any): Promise<T | null> {
		try {
			const result = await this.model
				.findOneAndUpdate(search, update, {
					new: true
				})
				.lean();
			return result as T;
		} catch (error) {
			throw logError({
				message: `Change info of ${this.name} failure`,
				error
			});
		}
	}

	public async deleteById(id: String): Promise<T | null> {
		try {
			const result = await this.model.findByIdAndDelete(id);
			return result;
		} catch (error) {
			throw logError({ message: `Delete ${this.name} error`, error });
		}
	}
}
