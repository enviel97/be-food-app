import { number } from 'yup';

interface Pagination<T> {
	total: number;
	offset: number;
	limit: number;
	datas: T[];
}

export default interface Provider<T = any> {
	findById?: (id: String) => Promise<T | null>;
	findByAttribute?: (search: any) => Promise<T>;
	findAll?: (offset: number, limit: number) => Promise<Pagination<T>>;
	create?: (data: T) => Promise<T>;
	updateById?: (id: String, data: any) => Promise<T | null>;
	deleteById?: (id: String) => Promise<T | null>;
}
