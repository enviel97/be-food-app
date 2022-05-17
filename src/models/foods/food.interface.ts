/**
 * name;
 * images;
 * comments;
 * finalRate;
 * timePrepare;
 * status;
 * description;
 * price;
 */

export enum FoodStatus {
	empty = 'empty',
	normal = 'normal',
	little = 'little'
}

export interface IFood {
	name: String;
	imgs: String[];
	comments: String[];
	finalRate: number;
	timePrepare: number;
	status: FoodStatus;
	description: String;
	price: number;
}
