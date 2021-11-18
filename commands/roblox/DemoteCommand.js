const { MessageEmbed } = require('discord.js');
const roblox = require('noblox.js');
const Discord = require('discord.js');
const allowedRanks = process.env.AllowedRanks.split(",");
const path = require('path');
require('dotenv').config();

module.exports = {
	name: 'demote',
	category: 'roblox',
    rolesRequired: allowedRanks,
	description: 'demote a user',
	timeout: 1000,
  usage: '<username>',
	run: async (client, message, args) => {
let embed = new Discord.MessageEmbed();

        let username = args[0];
        if(!username) {
            embed.setDescription(`Missing arguments.\n\nUsage: ${process.env.PREFIX}demote <username>`);
            embed.setColor("RED");
            embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
            return message.channel.send(embed);
        }

        let id;
        try {
            id = await roblox.getIdFromUsername(username);
        } catch (err) {
            embed.setDescription(`${username} is not a Roblox user.`);
            embed.setColor("RED");
            embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
            return message.channel.send(embed);
        }

        let rankInGroup = await roblox.getRankInGroup(process.env.groupId, id);
        let rankingTo = rankInGroup - 1;
        if(process.env.maxRank <= rankInGroup) {
            embed.setDescription('This bot cannot rank this user due to the maximum rank configured.');
            embed.setColor("RED");
            embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
            return message.channel.send(embed);
        }

        if(rankInGroup === 0){
            embed.setDescription('That user is not in the group.');
            embed.setColor("RED");
            embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
            return message.channel.send(embed);
        }

        let linkedUser = await client.utils.getLinkedUser(message.author.id, message.guild.id);
            if(!linkedUser) {
                embed.setDescription('You must be verified on either of the sites below to use this command.\n\n**Bloxlink:** https://blox.link\n**RoVer:** https://verify.eryn.io');
                embed.setColor("RED");
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
                return message.channel.send(embed);
            }

            if(linkedUser === 'RATE_LIMITS') {
                embed.setDescription('Verification checks are currently on cooldown.');
                embed.setColor("RED");
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
                return message.channel.send(embed);
            }

            if(linkedUser == id) {
                embed.setDescription('You can\'t rank yourself!');
                embed.setColor("RED");
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
                return message.channel.send(embed);
            }

            let linkedUserRankInGroup = await roblox.getRankInGroup(process.env.groupId, linkedUser);
            if(rankInGroup >= linkedUserRankInGroup) {
                embed.setDescription('You can only rank people with a rank lower than yours, to a rank that is also lower than yours.');
                embed.setColor("RED");
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
                return message.channel.send(embed);
            }
        

        let rankNameInGroup = await roblox.getRankNameInGroup(process.env.groupId, id);
        let rankingInfo;
        try {
            rankingInfo = await roblox.demote(process.env.groupId, id);
        } catch (err) {
            console.log(`Error: ${err}`);
            embed.setDescription('Oops! An unexpected error has occured. The bot owner can check the bot logs for more information.');
            embed.setColor("RED");
            embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
            return message.channel.send(embed);
        }

        embed.setDescription(`**Success!** Demoted ${username} to ${rankingInfo.newRole.name} (${rankingInfo.newRole.rank}).`);
        embed.setColor("GREEN");
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
        message.channel.send(embed);

        if(linkedUser) {
            let linkedUserName = await roblox.getUsernameFromId(linkedUser);
            await client.recordRankEvent({
                userId: linkedUser,
                username: linkedUserName,
                rank: rankingTo
            });
        }

        if(process.env.logChannelId !== 'false') {
            let logEmbed = new Discord.MessageEmbed();
            let logChannel = await client.channels.fetch(process.env.logChannelId);
            logEmbed.setDescription(`**Moderator:** <@${message.author.id}> (\`${message.author.id}\`)\n**Action:** Demotion\n**User:** ${username} (\`${id}\`)\n**Rank Change:** ${rankNameInGroup} (${rankInGroup}) -> ${rankingInfo.newRole.name} (${rankingInfo.newRole.rank})`);
            logEmbed.setColor("ORANGE");
            logEmbed.setAuthor(message.author.tag, message.author.displayAvatarURL());
            logEmbed.setTimestamp();
            logEmbed.setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`);
            return logChannel.send(logEmbed);
        } else {
            return;
        }
	},
};
