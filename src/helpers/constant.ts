/** Route constant */

/** Status result */

export const statusCode = {
	success: {
		OK: 200,
		CREATED: 201,
		ACCEPTED: 203,
		NO_CONTENT: 204
	},
	error: {
		BAD_REQUEST: 400,
		UNAAUTHORIZED: 401,
		PAYMENT_REQUIRED: 402,
		NOT_FOUND: 404,
		CONFLICT: 409
	},
	server_error: {
		INTERNAL_SERVER_ERROR: 500,
		NOT_IMPLEMENT: 501,
		BAD_GETEWAY: 502
	}
};
