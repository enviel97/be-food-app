import { Router } from 'express';
import userRoute from './user.route';
import foodRoute from './food.route';

export interface Injection {
	name: string;
	router: Router;
}

const route: Injection[] = [userRoute, foodRoute];

export default route;
