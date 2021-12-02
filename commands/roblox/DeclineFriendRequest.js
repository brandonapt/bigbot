const { MessageEmbed } = require('discord.js');
const noblox = require('noblox.js')
const discord = require('discord.js')
module.exports = {
	name: 'declinefriendrequest',
	category: 'roblox',
	description: 'decline a friend request',
	timeout: 1000,
  usage: "<username>",
  rolesRequired: [],
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
      await noblox.declineFriendRequest(id)
    } catch {
      client.errorEmbed.setDescription('There is no friend request from **' + args[0] + '** to decline!')
      return message.reply(client.errorEmbed)
    }
    client.successEmbed.setDescription(`Successfully declined **${args[0]}**'s friend request!`)
    message.channel.send(client.successEmbed)
	},
};
