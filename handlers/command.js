const glob = require('fast-glob');
const { resolve } = require('path');
let commands = [];

const Discord = require('discord.js')

module.exports = async (client) => {
	const commandFiles = await glob(`${__dirname}/../commands/**/*.js`);
	for (const commandFile of commandFiles) {
		const command = require(resolve(commandFile));

		if (!command.name) {
			throw Error(`${command} is missing a name key`);
		}
		if (!command.run || (typeof command.run !== 'function')) {
			throw Error(`${command.name} is missing a run function`);
    }
    commands.push(command.name)
		client.commands.set(command.name, command);
	}
  client.commandNames = commands
};
