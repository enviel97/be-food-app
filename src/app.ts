import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import logger from './library/logger';
import route from './routes';
import photoRoute from './routes/photo.route';

const router = express();

/** Connect to Mongo */
mongoose
	.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
	.then(() => {
		logger.success('Connect mongoose');
		startServer();
	})
	.catch((error) => {
		logger.error('Connect mongoose error');
		logger.error(`${error}`);
	});

/** Start server */
/**
 * Start database: Prevent start if have any problem to conect database
 */
const startServer = () => {
	router.use((req, res, next) => {
		const { method, url, socket } = req;
		/** Logger */
		logger.log(
			`Incomming - Method: [${method}] - Url: [${url}] - IP: [${socket.remoteAddress}]`
		);

		/** Event handler */
		res.on('finish', () => {
			logger.log(
				`Outcomming - Method: [${method}] - Url: [${url}] - IP: [${socket.remoteAddress}] - StatusCode: [${res.statusCode}]`
			);
		});

		next();
	});

	/** Config server */
	router.use(express.urlencoded({ extended: true }));
	router.use(express.json());

	/** public routes */
	router.use(photoRoute.name, photoRoute.router);

	/** Security */
	router.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		);

		if (req.method == 'OPTIONS') {
			res.header(
				'Access-Control-Allow-Methods',
				'PUT, POST, DELETE, GET, PATCH'
			);
			return res.status(200).json({});
		}

		// check api key
		const key = req.headers['authenticate'] || req.query.apiKey;
		if (!key || key !== config.server.api) {
			return res.status(401).json({ message: 'Invalid api key' });
		}

		next();
	});

	/** Routes */
	route.forEach((injectValue) => {
		logger.success(`Inject ${injectValue.name}`);
		router.use(injectValue.name, injectValue.router);
	});

	/** Healthcheck */
	router.get('/ping', (_, res, __) =>
		res.status(200).json({ message: 'ping' })
	);

	router.use((_, res, __) => {
		const error = new Error('Not found');
		logger.error(error);
		return res.status(404).json({ message: error.message });
	});

	/** app run */
	http.createServer(router).listen(config.server.port, () => {
		logger.log(`Server is running on port ${config.server.port}`);
	});
};
