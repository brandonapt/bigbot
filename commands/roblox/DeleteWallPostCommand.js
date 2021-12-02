const { MessageEmbed } = require('discord.js');
const noblox = require('noblox.js')
require('dotenv').config()
const discord = require('discord.js')
module.exports = {
	name: 'deletewallpost',
	category: 'roblox',
	description: 'delete a wall post',
	timeout: 1000,
  usage: '<id>',
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
