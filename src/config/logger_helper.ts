import logger from '../library/logger';

export const logError = (props: {
	/** Message will show for user show */
	message: string;
	/** System noptification */
	error: any;
}) => {
	const { message, error } = props;
	const _error = new Error(message);
	logger.error(_error.message);
	error ?? logger.log(error);
	return error;
};
