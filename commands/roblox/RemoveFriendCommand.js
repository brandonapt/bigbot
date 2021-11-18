const { MessageEmbed } = require('discord.js');
const allowedRanks = process.env.AllowedRanks.split(",");
const noblox = require('noblox.js')
const discord = require('discord.js')
module.exports = {
	name: 'removefriend',
	category: 'roblox',
	description: 'remove a friend',
  usage: '<username>',
	timeout: 1000,
  rolesRequired: allowedRanks,
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
      await noblox.removeFriend(id)
    } catch {
      client.errorEmbed.setDescription(`You are not friends with **${args[0]}**!`)
      return message.reply(client.errorEmbed)
    }
    client.successEmbed.setDescription(`Removed **${args[0]}** from your friends list!`)
    message.channel.send(client.successEmbed)
	},
};
