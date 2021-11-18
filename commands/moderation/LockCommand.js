const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'serverlock',
  rolesRequired: ['Moderation Permissions'],
	category: 'moderation',
  usage: '',
	run: async (client, message, args) => {
		const channels = message.guild.channels.cache.filter((ch) => ch.type !== 'category');
		if (args[0] === 'on') {
			channels.forEach((channel) => {
				channel.updateOverwrite(message.guild.roles.everyone, {
					SEND_MESSAGES: false,
				}).then(() => {
					channel.setName(channel.name += '🔒');
				});
			});
			return message.channel.send(client.embed('Success!', 'Locked all channels!'));
		} if (args[0] === 'off') {
			channels.forEach((channel) => {
				channel.updateOverwrite(message.guild.roles.everyone, {
					SEND_MESSAGES: true,
				}).then(() => {
					channel.setName(channel.name.replace('🔒', ''));
				});
			});
			return message.channel.send(client.embed('Success!', 'Unlocked all channels!'));
		}
		return '';
	},
};
