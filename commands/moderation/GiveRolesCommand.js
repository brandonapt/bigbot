const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'addrole',
  rolesRequired: ['Moderation Permissions'],
  usage: '<username || userID> <roleID || role ping>',
	run: async (client, message, args) => {
		message.delete();

		if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(client.embed('Whoops!', "You need the ```MANAGE_ROLES``` permission to do that!")).then((m) => m.delete({ timeout: 5000 }));

		if (!args[0] || !args[1]) return message.channel.send(client.embed('Whoops!', 'Please give me a username and role! Format:\n\n **!addrole <username || userID> <role id || role ping>**')).then((m) => m.delete({ timeout: 5000 }));

		try {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			const roleName = message.guild.roles.cache.find((r) => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

			const alreadyHasRole = member._roles.includes(roleName.id);

			if (alreadyHasRole) return message.channel.send(client.embed('Whoops!', 'The specified user already has that role!')).then((m) => m.delete({ timeout: 5000 }));

			const embed = new MessageEmbed()
				.setTitle(`Success!`)
				.setDescription(`${message.author} has successfully given the role ${roleName} to ${member.user}!`)
				.setColor('ORANGE')
				.setFooter(new Date().toLocaleString());

			return member.roles.add(roleName).then(() => message.channel.send(embed));
		} catch (e) {
			return message.channel.send(client.embed('Whoops! An error occurred!', '```' + e + '```')).then((m) => m.delete({ timeout: 5000 }));
		}
	},
};
