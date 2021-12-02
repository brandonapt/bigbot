const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'clear',
  rolesRequired: ['Moderation Permissions'],
	category: 'moderation',
  usage: '<amount>',
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
		if (!message.member.permissions.has('MANAGE_MESSAGES')) {
			return message.channel.send(
				client.embed('Whoops!', `You need permission to do this!`), // returns this message to user with no perms
			);
		}
		if (!args[0]) {
			return message.channel.send(client.embed('Whoops!', 'Please enter an amount between 1-100 messages to purge'));
		}

		let deleteAmount = parseInt(args[0], 10);

		if (Number.isNaN(deleteAmount)) {
			return message.channel.send(client.embed('Whoops!', 'Please enter an amount between 1-100 messages to purge'));
		}

		// could use ternary
		if (deleteAmount > 100) {
			deleteAmount = 100;
		} else {
			deleteAmount = parseInt(args[0], 10);
		}

		await message.channel.bulkDelete(deleteAmount, true);

		const embed = new MessageEmbed()
			.setTitle(`Success!`)
			.setDescription(`Successfully purged ${deleteAmount} messages!`)
			.setFooter('jave')
			.setColor('ORANGE');
		return message.channel.send(embed);
	},
};
