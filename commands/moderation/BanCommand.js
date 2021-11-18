const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ban',
  rolesRequired: ['Moderation Permissions'],
	category: 'moderation',
  usage: '<username> (reason)',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('BAN_MEMBERS')) {
      var embed1 = client.embed('Woah, There!', "You need the ```BAN_MEMBERS``` permission to use this command")
			return message.channel.send(embed1);
		}
		if (!args[0]) {
            var embed2 = client.embed('Woah, There!', "You need to mention someone to ban!")
			return message.channel.send(embed2);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		const reason = args[1] ? args.splice(1).join(' ') : 'No Reason Given';

		try {
			await member.ban({ reason });
			return message.channel.send(client.embed('Success!', 'Successfully banned <@' + member + '>!'));
		} catch (e) {
			return message.channel.send(client.embed('Whoops!', 'An error occurred!\n\n ```' + e + '```'));
		}
	},
};
