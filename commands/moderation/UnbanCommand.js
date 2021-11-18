const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'unban',
  usage: '<mention>',
  rolesRequired: ['Moderation Permissions'],
	run: async (client, message, args) => {
		if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(client.embed('Woah, There!', "You need the ```BAN_MEMBERS``` permission to use this command")).then((m) => m.delete({ timeout: 5000 }));

		if (!args[0]) return message.channel.send(client.embed('Woah, There!', "You need to mention someone to unban!")).then((m) => m.delete({ timeout: 5000 }));

		let member;

		try {
			member = await client.users.fetch(args[0]);
		} catch (e) {
			console.log(e);
			return message.channel.send(client.embed('Whoops!', 'Please give me a valid user!')).then((m) => m.delete({ timeout: 5000 }));
		}

		const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

		const embed = new MessageEmbed()
			.setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

		return message.guild.fetchBans().then((bans) => {
			const user = bans.find((ban) => ban.user.id === member.id);

			if (user) {
				embed.setTitle(`Successfully Unbanned ${user.user.tag}`)
					.setColor('ORANGE')
					.addField('User ID', user.user.id, true)
					.addField('user Tag', user.user.tag, true)
					.addField('Banned Reason', user.reason != null ? user.reason : 'no reason')
					.addField('Unbanned Reason', reason);
				message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed));
			} else {
				embed.setTitle(`User ${member.tag} isn't banned!`)
					.setColor('ORANGE');
				message.channel.send(embed);
			}
		}).catch((e) => {
			console.log(e);
			message.channel.send('An error has occurred!');
		});
	},
};
