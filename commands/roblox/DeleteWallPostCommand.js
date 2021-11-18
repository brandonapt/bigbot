const { MessageEmbed } = require('discord.js');
const allowedRanks = process.env.AllowedRanks.split(",");
const noblox = require('noblox.js')
require('dotenv').config()
const discord = require('discord.js')
module.exports = {
	name: 'deletewallpost',
	category: 'roblox',
	description: 'delete a wall post',
	timeout: 1000,
  usage: '<id>',
  rolesRequired: allowedRanks,
	run: async (client, message, args) => {
    const group = process.env.groupId;
    if (!args[0]) {
      client.errorEmbed.setDescription('Please provide a wall post ID!')
      return message.reply(client.errorEmbed)
    }


    try {
      await noblox.deleteWallPost(Number(group), Number(args[0]))
    } catch (e) {
      client.errorEmbed.setDescription('An error occured! \n' + e)
      return message.channel.send(client.errorEmbed)
    }

    client.successEmbed.setDescription('Succesfully deleted the wall post!')
    message.channel.send(client.successEmbed)
	},
};
