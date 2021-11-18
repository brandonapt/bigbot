const { MessageEmbed } = require('discord.js');
const noblox = require('noblox.js')
require('dotenv').config()
const filer = m => m.content.toLowerCase() = ['cookie', 'group']
var embeds = [], buttons = [];
const discord = require('discord.js')
module.exports = {
	name: 'setup',
	category: 'settings',
	description: 'best ways to set up bot',
	timeout: 1000,
  rolesRequired: [],
  usage: '',
	run: async (client, message, args) => { 
    const embed1 = new MessageEmbed()
      .setTitle('How should I set up?')
      .setTimestamp()
      .setDescription('Run ' + process.env.PREFIX + 'help to see the commands, and use the addreq command to add a role to restrict the command')
    message.channel.send(embed1)

    
	},
};
