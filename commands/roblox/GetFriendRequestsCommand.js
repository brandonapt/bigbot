const { MessageEmbed } = require('discord.js');
const noblox = require('noblox.js')
const discord = require('discord.js')
module.exports = {
	name: 'getfriendrequests',
	category: 'roblox',
	description: 'get all friend requests',
	timeout: 1000,
      usage: '',
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
    const embed = new MessageEmbed()
      .setTitle('Friend Requests') 
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter('brandonn')
    let requests
    try {
      requests = await noblox.getFriendRequests()
    } catch (e) {
      client.errorEmbed.setDescription('An error occured!')
      return message.reply(client.errorEmbed)
    }

    if (!requests.data[0]) {
      embed.setDescription('No friend requests!')
      return message.channel.send(embed)
    }
    //console.log(requests.data[0])

    for (i in requests.data) {
    embed.addField(requests.data[i].name, requests.data[i].id)
    }
    message.channel.send(embed)
	},
};
