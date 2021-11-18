const allowedRanks = process.env.AllowedRanks.split(",");
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const fs = require('fs')
const db = require('block.db');
const discord = require('discord.js')
module.exports = {
	name: 'disablemodule',
	category: 'settings',
	description: 'disable certain modules',
	timeout: 1000,
  rolesRequired: [],
  usage: '<module>',
	run: async (client, message, args) => {
    let isAllowed = false;
    for(let i = 0; i < allowedRanks.length; i++) {
        if(message.member.roles.cache.some(role => [allowedRanks[i]].includes(role.name))) {
            isAllowed = true;
        }
    }

    if(isAllowed == false) {
        return message.channel.send(client.errorEmbed.setDescription('You can do not have the permissions to do this!'));
    }
      if (!args[0]) {
        return message.reply(client.errorEmbed.setDescription('Please provide a module to disable!'))
      }

      if (args[0].toLowerCase() == 'settings') {
        client.errorEmbed.setDescription('You cannot disable the settings module!')
        return message.channel.send(client.errorEmbed)
      }
      const catagories = client.cat
              let thing = db.get(`${message.guild.id}_${args[0].toLowerCase()}_enabled`)
        if (!thing == true) {
          client.errorEmbed.setDescription('This module is already disabled!')
            return message.reply(client.errorEmbed)
          }
      for (i in client.cat)
      {
        if (args[0].toLowerCase() == client.cat[i])
        {
          client.successEmbed.setDescription('Successfully disabled the module ``' + args[0].toLowerCase() + '``!')
          message.reply(client.successEmbed)
          return db.set(`${message.guild.id}_${args[0].toLowerCase()}_enabled`, false)
        }
        
      }

      message.reply('I could not disable the module! (may not be a valid module)')



      


	},
};
