const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'serverlock',
  rolesRequired: ['Moderation Permissions'],
	category: 'moderation',
  usage: '',
	run: async (client, message, args) => {
    const allowedRanks = process.env.AllowedRanks.split(",");

    let isAllowed = false;
    for(let i = 0; i < allowedRanks.length; i++) {
        if(message.member.roles.cache.some(role => [allowedRanks[i]].includes(role.name))) {
            isAllowed = true;
        }
    }

    if(isAllowed == false) {
        return message.channel.send(client.embed("No Permission", "You don't have permission to run this command"));
    }
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
