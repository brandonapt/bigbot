const { MessageEmbed } = require('discord.js');
const allowedRanks = process.env.AllowedRanks.split(",");
const noblox = require('noblox.js')
const discord = require('discord.js')
module.exports = {
	name: 'acceptfriendrequest',
	category: 'roblox',
	description: 'accept a friend request',
	timeout: 1000,
  rolesRequired: allowedRanks,
  usage: '<username>',
	run: async (client, message, args) => {
    if (!args[0]) {
      client.errorEmbed.setDescription('Please provide a username!')
     return message.reply(client.errorEmbed)
    }

    let id;
    try {
        id = await noblox.getIdFromUsername(args[0]);
    } catch {
        return message.channel.send({embed: {
            color: 16733013,
            description: `Oops! **${args[0]}** is not a Roblox user. Perhaps you misspelled?`
        }});
    }

    try {
      await noblox.acceptFriendRequest(id)
    } catch {
      client.errorEmbed.setDescription('There is no friend request from **' + args[0] + '** to accept!')
      return message.reply(client.errorEmbed)
    }
    client.successEmbed.setDescription(`Successfully accepted **${args[0]}**'s friend request!`)
    message.channel.send(client.successEmbed)
	},
};
