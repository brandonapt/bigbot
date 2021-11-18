const { MessageEmbed } = require('discord.js');
const allowedRanks = process.env.AllowedRanks.split(",");
const noblox = require('noblox.js')
const discord = require('discord.js')
module.exports = {
	name: 'getwall',
	category: 'roblox',
	description: 'get wall',
  usage: '',
	timeout: 1000,
  rolesRequired: [],
	run: async (client, message, args) => {
    let groupId = process.env.groupId;
    let posts
    try {
      posts = await noblox.getWall(Number(groupId), 'Asc', 10)
    } catch (e) {
      client.errorEmbed.setDescription('An error occured!\nThis might be because Roblox is ratelimiting the bot! Try again in a few minutes.')
      //console.log(e)
      return message.reply(client.errorEmbed)
    }
    const embed = new MessageEmbed()
      .setTitle('Wall')
      .setColor("RANDOM")
    if (!posts.data[0]) {
      embed.setDescription('No wall posts!')
      return message.channel.send(embed)
    }

    for (i in posts.data) {
      //console.log(posts.data[i].poster.user.username)
      embed.addField(posts.data[i].poster.user.username,posts.data[i].body + '\nID: ' + posts.data[i].id)
    }
    message.channel.send(embed)
	},
};
