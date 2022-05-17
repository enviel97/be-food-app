"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const logger_1 = __importDefault(require("./library/logger"));
const routes_1 = __importDefault(require("./routes"));
const router = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    logger_1.default.success('Connect mongoose');
    startServer();
})
    .catch((error) => {
    logger_1.default.error('Connect mongoose error');
    logger_1.default.error(`${error}`);
});
const startServer = () => {
    router.use((req, res, next) => {
        const { method, url, socket } = req;
        logger_1.default.log(`Incomming - Method: [${method}] - Url: [${url}] - IP: [${socket.remoteAddress}]`);
        res.on('finish', () => {
            logger_1.default.log(`Outcomming - Method: [${method}] - Url: [${url}] - IP: [${socket.remoteAddress}] - StatusCode: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET, PATCH');
            return res.status(200).json({});
        }
        const key = req.headers['authenticate'] || req.query.apiKey;
        if (!key || key === config_1.config.server.api) {
            return res.status(401).json({ message: 'Invalid api key' });
        }
        next();
    });
    routes_1.default.forEach((injectValue) => {
        logger_1.default.success(`Inject ${injectValue.name}`);
        router.use(injectValue.name, injectValue.router);
    });
    router.get('/ping', (_, res, __) => res.status(200).json({ message: 'ping' }));
    router.use((_, res, __) => {
        const error = new Error('Not found');
        logger_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => {
        logger_1.default.log(`Server is running on port ${config_1.config.server.port}`);
    });
};
