const inquirer = require('inquirer');
const exec = require('async-execute');

module.exports = async () => {
	const version = await exec(`${__dirname}/get-version.sh`);
	const message = await exec(`${__dirname}/get-message.sh`);

	inquirer
		.prompt([
			{
				name: 'version',
				message: 'Version',
				type: 'input',
				default: version,
			},
			{
				name: 'message',
				message: 'Message',
				type: 'input',
				default: message,
			},
		])
		.then(async answers => {
			const {version, message} = answers;

			return exec(`${__dirname}/service.sh ${version} "${message}"`);
		})
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.error(error);
			throw error;
		});
};
