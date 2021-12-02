const { MessageEmbed } = require('discord.js');
const allowedRanks = process.env.AllowedRanks.split(",");
const noblox = require('noblox.js')
const discord = require('discord.js')
module.exports = {
	name: 'startshift',
	category: 'others',
	description: 'start a shift!',
	timeout: 1000,
  rolesRequired: allowedRanks,
	run: async (client, message, args) => {
    if (!args[0]) {
      return message.reply(client.embed("Whoops!", "Please provide a time!"))
    }
    const time = args[0]
    const host = `<@${message.author.id}>`
    const channel = client.channels.cache.get("894733795872346113")
    const ping = `<@&898032660167934023>`
    const embed = new MessageEmbed()
      .setTitle('Cookie Crumble Cafe & Bakery')
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription(`Hello Cookie Crumble Cafe! **${host}** is hosting a shift at **${time}**!\n\nGame Link: https://www.roblox.com/games/7724286170/Work-at-Cookie-Crumble-Cafe-Bakery-V1`)
      channel.send(ping)
      channel.send(embed)
	},
};
