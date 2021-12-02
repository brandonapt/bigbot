const { MessageEmbed } = require('discord.js');
const noblox = require('noblox.js')
const discord = require('discord.js')
module.exports = {
	name: 'declineallfriendrequests',
	category: 'roblox',
	description: 'decline all friend requests',
	timeout: 1000,
  usage: ' ',
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

    try {
      noblox.declineAllFriendRequests()
    } catch (e) {
      client.errorEmbed.setDescription('An error occured! Please try again!')
      return message.reply(client.errorEmbed)
    }

    client.successEmbed.setDescription(`Successfully declined all friend requests!`)
    message.channel.send(client.successEmbed)
	},
};
