#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const setup = require('./lib/setup');

clear();

console.log(
	chalk.yellow(
		figlet.textSync('GA-TA', { horizontalLayout: 'controlled smushing' }),
	),
);

console.log(chalk.bold.greenBright('Hey there fellow TA!'));
console.log(
	chalk.whiteBright(
		'Here is a CLI that should take care of some of the boring stuff',
	),
);

// https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

if (!setup.checkIfClassFolderPresent()) {
	console.log(chalk.blueBright("\n\nLet's get everything setup!"));
	try {
		setup.createClassFolder();
	} catch (err) {
		console.log(err);
	}
}
