import chalk from 'chalk';
import { SingleBar } from 'cli-progress';

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
		),
	progress: new SingleBar({
		format:
			'CLI Progress |' +
			chalk.cyan('{bar}') +
			'| {percentage}% || {value}/{total} Chunks || Speed: {speed}',
		barCompleteChar: '\u2588',
		barIncompleteChar: '\u2591',
		hideCursor: true
	})
};
