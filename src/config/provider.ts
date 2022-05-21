import { number } from 'yup';

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

export default interface Provider<T = any> {
	findById?: (id: String) => Promise<T | null>;
	findOne?: (search: any) => Promise<T | null>;
	findByAttribute?: (search: any, options: Options) => Promise<Pagination<T>>;
	findAll?: (offset: number, limit: number) => Promise<Pagination<T>>;
	create?: (data: T) => Promise<T>;
	updateById?: (id: String, data: any) => Promise<T | null>;
	updateByAttribute?: (search: any, update: any) => Promise<T | null>;
	deleteById?: (id: String) => Promise<T | null>;
}
