import logger from '../library/logger';

export const logError = (props: {
	/** Message will show for user show */
	message: string;
	/** System noptification */
	error: any;
}) => {
	const { message, error } = props;
	logger.error(message);
	error && logger.log(error);
	return { message };
};
