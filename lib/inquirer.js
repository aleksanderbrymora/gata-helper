const inquirer = require('inquirer');

const urlValidateRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

module.exports = {
	wantsToOpen: () => {
		return inquirer.prompt([
			{
				name: 'isOpen',
				type: 'confirm',
				message: 'Would you like to edit it now?',
			},
		]);
	},
	askClassDetails: () => {
		return inquirer.prompt([
			{
				name: 'fullName',
				type: 'input',
				message: 'Input your full name:',
				validate: function (value) {
					if (value.length) {
						return true;
					} else {
						return 'Please enter your full name.';
					}
				},
			},
			{
				name: 'classNumber',
				type: 'number',
				message: 'Enter a class number:',
				validate: function (value) {
					if (value > 0) {
						return true;
					} else {
						return 'Please enter a valid number';
					}
				},
			},
			{
				name: 'classInstructor',
				type: 'input',
				message: 'Enter the name of the instructor:',
				validate: function (value) {
					if (value.length) {
						return true;
					} else {
						return 'Please enter a valid name';
					}
				},
			},
			{
				name: 'classRepo',
				type: 'input',
				message: 'Enter the URL to the Instructors repo with classwork:',
				validate: function (value) {
					if (urlValidateRegex.test(value) || value.length === 0) {
						return true;
					} else {
						return 'Please enter a valid url';
					}
				},
			},
			{
				name: 'studentNames',
				type: 'input',
				message:
					'Input all the full names of students, separating them by comas:\n',
				validate: function (value) {
					if (value.length) {
						return true;
					} else {
						return 'Please enter a valid name';
					}
				},
			},
		]);
	},
};
