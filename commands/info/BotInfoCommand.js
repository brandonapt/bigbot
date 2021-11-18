const { MessageEmbed } = require('discord.js');
const os = require('os');

module.exports = {
	name: 'botinfo',
	category: 'info',
  usage: '',
    rolesRequired: [],

	run: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setThumbnail(client.user.displayAvatarURL())
			.setTitle('Bot Stats')
			.setColor('#000000')
			.addFields(
				{
					name: '👥 Server Users',
					value: `Serving ${client.users.cache.size}`,
					inline: true,
				},
				{
					name: '⏳ Ping',
					value: `${Math.round(client.ws.ping)}ms`,
					inline: true,
				},
				{
					name: 'Join Date',
					value: client.user.createdAt,
					inline: true,
				},
				{
					name: 'Server Info',
					value: `Cores: ${os.cpus().length}`,
					inline: true,
				},
			)
			.setFooter(`Created By: ${message.author.tag}`, message.author.displayAvatarURL());

		return message.channel.send(embed);
	},
};
