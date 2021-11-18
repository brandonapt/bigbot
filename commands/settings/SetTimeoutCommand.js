const { MessageEmbed } = require('discord.js');
const allowedRanks = process.env.AllowedRanks.split(",");
const noblox = require('noblox.js')
const discord = require('discord.js')
const db = require('quick.db')
module.exports = {
	name: 'settimeout',
	category: 'settings',
	description: 'adds a timeout to a cmd',
	timeout: 1000,
  rolesRequired: allowedRanks,
  usage: '<command> <time in seconds>',
	run: async (client, message, args) => {

    if (!args[0]) {
      client.errorEmbed.setDescription('Please provide a command to add a timeout for.')
      return message.reply(client.errorEmbed)
    }
        if (!args[1]) {
      client.errorEmbed.setDescription('Please provide a timeout.')
      return message.reply(client.errorEmbed)
    }
	const commands = client.commandNames


    //console.log(commands)
    let thing = args[1] * 1000
    if (args[1] == 0) thing = null
      for (i in commands)
      {
        if (args[0].toLowerCase() == commands[i])
        {

          if (db.get(`${args[0].toLowerCase()}_timeout_${message.guild.id}`) == null ) {
                      db.set(`${args[0].toLowerCase()}_timeout_${message.guild.id}`, 0)
          }

          db.set(`${args[0].toLowerCase()}_timeout_${message.guild.id}`, thing)
          return message.reply('Done!')

        }
        
      }
    client.errorEmbed.setDescription('That is not a valid command.')
    return message.channel.send(client.errorEmbed)
	},
};
