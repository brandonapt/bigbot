const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
  usage: '<time>',
	name: 'slowmode',
  rolesRequired: ['Moderation Permissions'],
	run: async (client, message, args) => {
		if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(client.embed('Whoops!', 'You need the ```MANAGE_CHANNELS``` permission to do this!')).then((m) => m.delete({ timeout: 5000 }));

		if (!args[0]) {
			return message.channel.send(client.embed('Whoops!', 'Please specify a time!')).then((m) => m.delete({ timeout: 5000 }));
		}

		const currentCooldown = message.channel.rateLimitPerUser;

		const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

		const embed = new MessageEmbed()
			.setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

		if (args[0] === 'off') {
			if (currentCooldown === 0) return message.channel.send(client.embed('Whoops!', 'The slowmode is already set to 0!')).then((m) => m.delete({ timeout: 5000 }));

			embed.setTitle('Slowmode Disabled')
				.setColor('#00ff00');
			return message.channel.setRateLimitPerUser(0, reason);
		}

		const time = ms(args[0]) / 1000;

		if (Number.isNaN(time)) {
			return message.channel.send(client.embed('Whoops!', "Please provide a valid time in miliseconds.")).then((m) => m.delete({ timeout: 5000 }));
		}

		if (time >= 21600) {
			return message.channel.send(client.embed('Whoops!', 'The slowmode can\'t be longer than 6 hours.')).then((m) => m.delete({ timeout: 5000 }));
		}

		if (currentCooldown === time) {
			return message.channel.send(client.embed('Whoops!', "The slowmode is already " + time + '!'));
		}

		embed.setTitle('Slowmode Enabled')
			.addField('Slowmode: ', args[0])
			.addField('Reason: ', reason)
			.setColor('#ff0000');

		const msg = await message.channel.setRateLimitPerUser(time, reason);
		return msg.send(client.embed('Success!', 'Set the slowmode to ' + args[0] + '!'));
	},
};
