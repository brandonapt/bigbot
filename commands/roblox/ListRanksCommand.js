const { MessageEmbed } = require('discord.js');
const roblox = require("noblox.js");
const Discord = require("discord.js");
require('dotenv').config();
module.exports = {
	name: 'listranks',
	category: 'roblox',
  usage: '',
	description: 'list rank',
	timeout: 1000,
	run: async (client, message, args) => {
     const getRoles = await roblox.getRoles(Number(process.env.groupId))
    const formattedRoles = getRoles.map((r) => `\`${r.name}\` - ${r.rank} **(${r.memberCount})**`);

    const rankListEmbed = new Discord.MessageEmbed() 
      .setTitle('Rank Information:')
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor(8311585)
      .setDescription(formattedRoles)
      .setFooter(`jave`);
    message.channel.send(rankListEmbed)
	},
};
