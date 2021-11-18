const { MessageEmbed } = require('discord.js');
const allowedRanks = process.env.AllowedRanks.split(",");
const noblox = require('noblox.js')
const db = require('quick.db')
const discord = require('discord.js')
module.exports = {
	name: 'clearreq',
	category: 'settings',
	description: 'this command clears requirements for command',
	timeout: 1000,
  rolesRequired: allowedRanks,
  usage: '<command>',
	run: async (client, message, args) => {
    if (!args[0]) {
      return message.reply('Provide a command.')
    }
	const commands = client.commandNames


    //console.log(commands)
      for (i in commands)
      {
        if (args[0].toLowerCase() == commands[i])
        {
          let array = []


          db.set(`${args[0].toLowerCase()}_roles_${message.guild.id}`, null)
          return message.reply('Done!')
          console.log(db.get(`${args[0].toLowerCase()}_roles_${message.guild.id}`))

        }
        
      }
    
	},
};
