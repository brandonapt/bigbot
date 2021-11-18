const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'kick',
  rolesRequired: ['Moderation Permissions'],
	category: 'moderation',
  usage: '<user> (reason)',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('KICK_MEMBERS')) {
            var embed1 = client.embed('Woah, There!', "You need the ```KICK_MEMBERS``` permission to use this command")
			return message.channel.send(embed1);
		}
		if (!args[0]) {
                  var embed2 = client.embed('Woah, There!', "You need to mention someone to kick!")
			return message.channel.send(embed2);
		}
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		try {
			await member.kick();
			return message.channel.send(client.embed('Success!', 'Successfully kicked <@' + member + '>!'));
		} catch (e) {
			return message.channel.send(client.embed('Whoops!', 'An error occurred!\n\n ```' + e + '```'));
		}
	},
};
