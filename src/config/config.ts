import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://dbFoodApp:${MONGO_PASSWORD}@database.abr1y.mongodb.net/${MONGO_USERNAME}`; // ?retryWrites=true&w=majority

const SERVER_PORT = process.env.PORT || 3000;

export const config = {
	mongo: {
		url: MONGO_URL
	},
	server: {
		port: SERVER_PORT
	}
};
