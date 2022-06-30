import { Router } from 'express';
export interface Injection {
	name: string;
	router: Router;
}

export { default as UserRoute } from './user.route';
export { default as FoodRoute } from './food.route';
export { default as AddressRoute } from './address.route';
