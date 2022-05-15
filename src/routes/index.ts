import { Router } from 'express';
import userRoute from './user.route';

export interface Injection {
	name: string;
	router: Router;
}

const route: Injection[] = [userRoute];

export default route;
