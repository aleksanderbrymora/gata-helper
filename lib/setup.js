const chalk = require('chalk');
const fs = require('fs');
const open = require('open');
const clear = require('clear');

const inquirer = require('./inquirer');

const CLASS_PATH = `${process.env.HOME}/sei-class`;

module.exports = {
	checkIfClassFolderPresent: () => fs.existsSync(CLASS_PATH),
	createClassFolder: async () => {
		// Gather class data
		const classData = await inquirer.askClassDetails();
		classData.studentNames = classData.studentNames
			.split(',')
			.map((s) => s.trim())
			.filter((s) => s.length);

		clear();

		try {
			fs.mkdirSync(CLASS_PATH);
			fs.mkdirSync(`${CLASS_PATH}/sei${classData.classNumber}-homework`);
			fs.mkdirSync(`${CLASS_PATH}/warmup-bank`);

			// Gitignore
			fs.writeFileSync(
				`${CLASS_PATH}/.gitignore`,
				`.directory
exercises.md

### OSX ###
*.DS_Store
.AppleDouble
.LSOverride

# Icon must end with two \r
Icon

# Thumbnails
._*

# Files that might appear in the root of a volume
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent

# Directories potentially created on remote AFP share
.AppleDB
.AppleDesktop
Network Trash Folder
Temporary Items
.apdisk

# End of https://www.gitignore.io/api/osx


# Ignore bundler config.
/.bundle

# Ignore the default SQLite database.
/db/*.sqlite3
/db/*.sqlite3-journal

# Ignore all logfiles and tempfiles.
/log/*

# ignore Rails cache files
tmp/
log/

!/log/.keep
!/tmp/.keep

node_modules/
/yarn-error.log

.byebug_history

# VScode
.vscode/`,
			);

			// Class data file - file with all the data needed to create everything
			fs.writeFileSync(
				`${CLASS_PATH}/classData.json`,
				JSON.stringify(classData, null, 2),
			);

			// Pull request template
			fs.writeFileSync(
				`${CLASS_PATH}/pull_request_template.md`,
				`# You can leave it empty if you had no problems
- How difficult did you find this (out of 10)? 0 being no problems at all, 10 being impossible

- Was there anything that you struggled with?

- Is there any particular code you want me to look into?

- Is there anything that you'd like some further information on?

- Roughly how long did it take?`,
			);

			// Main readme file
			fs.writeFileSync(
				`${CLASS_PATH}/readme.md`,
				`# SEi36 ([General Assembly, Sydney](https://generalassemb.ly/sydney))

### Homework Repository

1. Repository Setup;
2. Do Your Homework;
3. Submit Your Homework.

### Repository Setup

You only need to do this once, not every time you're submitting homework!

- **Fork this repository**
  - _'Forking' creates a personal, 'forked' copy of this repository on your Github account._
  - Hit the **Fork** button in the top right-hand corner of this page.
- **Clone your forked repository to your computer**
  - _'Cloning' takes your 'forked' repository on GitHub and creates a local copy - or 'clone' - on your computer._
  - Make sure you're browser is open to **your** forked version of this repository on Github (eg [http://github.com/{{YOUR_USERNAME}}/sei36](http://github.com/{{YOUR_USERNAME}}/sei36)).
  - Hit the **Clone or Download** button in the top right-hand corner of the page and copy the URL to your clipboard.
  - Open your computer's terminal to the directory in which you intend to store your homework.
  - \`git clone url_of_your_fork_on_github\` (where \`url_of_your_fork_on_github\` is the URL you copied after hitting 'Clone or Download', above).
- **Add an upstream remote repository**
  - _Adding an upstream repository links the local repository on your computer to the original repository on Github (i.e. mine, the one from which you created the fork)_
  - \`cd sei34-homework\`
  - \`git remote add upstream https://github.com/aleksanderbrymora/sei-36.git\`
  - \`git pull upstream master\`

### Do your Homework

You should put each night's homework in a new folder within the appropriate directory of your homework repo. So, for day two, where you have two tasks ("Calculator" and "Strings"), you might do something like this:

1. Open Terminal/iTerm2;
2. Go to your local homework repo (eg, \`cd ~/sei/homework\`);
3. From here, go to the folder matching your name within that repo, and the appropriate week (eg, \`taylor_swift/week_01\`);
4. Create new folders for each of the day's homework tasks: (eg \`mkdir calculator\` and \`mkdir strings\`);
5. Create the files necessary to complete the homework in their respective directories;
6. Get to it!

### Submit Your Homework

You need to do this every time you're submitting homework.

- **Commit your work to your local repository progressively**
  - Make sure you are the correct folder containing the homework you want to submit.
  - \`git add -A\`
  - \`git commit -m "YOUR_COMMIT_MESSAGE_GOES_HERE"\`(where \`YOUR_COMMIT_MESSAGE_GOES_HERE\` is your description of the work you are committing)
- **Push your changes to your forked repository**
  - \`git pull upstream master\` - merge changes that have been made to this repository into your own local repository.
  - \`git push origin master\`
- **Once you're finished, submit a pull request for me to accept your homework**
  - Navigate to your forked version of this repository on Github (eg [http://github.com/{{YOUR_USERNAME}}/sei36](http://github.com/{{YOUR_USERNAME}}/sei36)).
  - Hit the **Pull request** button.
  - Make sure the destination for the pull request is set to my repository, not your own or anyone else's.
  * **IMPORTANT:** In the pull request comment, tell me the following:
    1. How difficult did you find this (out of 10)? 0 being no problems at all, 10 being impossible;
    2. Was there anything that you struggled with?;
    3. Is there anything that you'd like some further information on?;
    4. Roughly how long did it take?

**If you don't mention anything in the Pull Request comments, we will assume you had no problems at all with it, and you will receive no feedback about your homework.**

If you want to follow up on any issues you had with the homework, the ideal time for that will be during the more unstructured lab time after lunch - come and see Joel or myself then and we can go over any outstanding questions.

**Note:** if I haven't yet merged your Pull Request into my master homework repo before it's time to submit the next day's homework, you won't be able to create a new Pull Request. That's okay - for the new homework just add a new comment to the open (existing) Pull Request, featuring the same four points given above to describe your response to it.`,
			);

			// Creating a folder for every person with readme
			classData.studentNames.forEach((s) => {
				const folderName = s.toLowerCase().split(' ').join('_');
				const folderPath = `${CLASS_PATH}/sei${classData.classNumber}-homework/${folderName}`;
				fs.mkdirSync(`${folderPath}/1week/1day`, { recursive: true });
				fs.writeFileSync(
					`${folderPath}/readme.md`,
					`# ${s}\n
Create your files here!

P.S. We suggest grouping homework files by weeks and days, but you do you - you're a free human`,
				);
			});
		} finally {
			// Output info about creating the folder
			console.log(chalk.blueBright(`\nClass folder has been set up:`));
			console.log(
				chalk.greenBright(`${CLASS_PATH}
	|- sei-${classData.classNumber}-homework/
	|- warmup-bank/
	|- classData.json
		`),
			);
		}
	},
};
