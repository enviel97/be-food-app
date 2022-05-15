import chalk from 'chalk';

const isString = (args: any) => typeof args === 'string';

export default {
	log: (args: any) => console.log('>>>>>>>>', args),
	success: (args: any) =>
		console.log(
			`[${new Date().toLocaleString()}]`,
			chalk.bgGreen.black.bold(` SUCCESS `),
			isString(args) ? chalk.grey(args) : args
		),
	error: (args: any) =>
		console.log(
			`[${new Date().toLocaleString()}]`,
			chalk.bgRed.black.bold(` Error `),
			isString(args) ? chalk.grey(args) : args
		),
	warn: (args: any) =>
		console.log(
			`[${new Date().toLocaleString()}]`,
			chalk.bgYellow.black.bold(` Warning `),
			isString(args) ? chalk.grey(args) : args
		)
};
