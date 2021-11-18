const { MessageEmbed } = require('discord.js');
const allowedRanks = process.env.AllowedRanks.split(",");
const noblox = require('noblox.js')
const discord = require('discord.js')
module.exports = {
	name: 'declineallfriendrequests',
	category: 'roblox',
	description: 'decline all friend requests',
	timeout: 1000,
  usage: ' ',
  rolesRequired: allowedRanks,
	run: async (client, message, args) => {

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
