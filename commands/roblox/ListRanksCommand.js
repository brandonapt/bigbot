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
