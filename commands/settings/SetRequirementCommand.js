const { MessageEmbed } = require('discord.js');
const allowedRanks = process.env.AllowedRanks.split(",");
const noblox = require('noblox.js')
const discord = require('discord.js')
const db = require('quick.db')
module.exports = {
	name: 'addreq',
	category: 'settings',
	description: 'adds a requirement to a cmd',
	timeout: 1000,
  rolesRequired: allowedRanks,
  usage: '<command> <role mention>',
	run: async (client, message, args) => {
              let mention = message.mentions.roles.first();
    if (!args[0]) {
      client.errorEmbed.setDescription('Please provide a command to add a role for.')
      return message.reply(client.errorEmbed)
    }
        if (!args[1] || !mention) {
      client.errorEmbed.setDescription('Please provide a role mention.')
      return message.reply(client.errorEmbed)
    }
	const commands = client.commandNames


    //console.log(commands)
      for (i in commands)
      {
        if (args[0].toLowerCase() == commands[i])
        {
          let array = []
          array.push(mention.id)
          if (db.get(`${args[0].toLowerCase()}_roles_${message.guild.id}`) == null ) {
                      db.set(`${args[0].toLowerCase()}_roles_${message.guild.id}`, [])
          }

          db.set(`${args[0].toLowerCase()}_roles_${message.guild.id}`, array)
          return message.reply('Done!')

        }
        
      }
    client.errorEmbed.setDescription('That is not a valid command.')
    return message.channel.send(client.errorEmbed)
	},
};
