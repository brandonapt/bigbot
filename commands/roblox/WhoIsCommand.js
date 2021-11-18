const { MessageEmbed } = require('discord.js');
const roblox = require("noblox.js");
const allowedRanks = process.env.AllowedRanks.split(",");
require('dotenv').config();
module.exports = {
	name: 'whois',
	category: 'roblox',
  usage: '<username>',
    rolesRequired: allowedRanks,
	description: 'gets the info of a user',
	timeout: 1000,
	run: async (client, message, args) => {
    let givenUsername = args[0];
  if (!givenUsername) 
  return message.channel.send({
     embed: {
       color: 13632027,
       description:
          `**You did not provide the \`username\` argument.**\n` +
          `\n` +
          `**Usage:** \`${process.env.PREFIX}getinfo <username>\``,
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL()
        },
        footer: {
          text: "jave"
        }
      }
   });
  
   roblox.getIdFromUsername(givenUsername).then(function(id) {
     roblox.getUsernameFromId(id).then(function(completeUsername) {
       roblox.getRankInGroup(Number(process.env.groupId), id).then(function(rankSet) {
        roblox.getRankNameInGroup(Number(process.env.groupId), id).then(function(rankName) {
    
        message.channel.send({
           content: `${completeUsername}:${id}`,
           embed: {
             title: `User Information`,
             color: "ORANGE",              
           author: {
             name: message.author.tag,
             icon_url: message.author.displayAvatarURL()
              },
              fields: [
                {
                  name: `Username`,
                  value: `[${completeUsername}](https://www.roblox.com/users/${id}/profile)`,
                  inline: false
                },
                {
                  name: `ID`,
                  value: id,
                  inline: false
                },
                {
                  name: `Group Rank`,
                  value: `${rankName} **(${rankSet})**`,
                  inline: false
                }
              ],
              thumbnail: {
                url: `https://assetgame.roblox.com/Thumbs/Avatar.ashx?userid=${id}`
              },              
          footer: {
          text: "jave"
              }
             }
           });
          })
        })
      })
    }).catch(function(err) {
      return message.channel.send({
        embed: {
          title: `User Invalid`,
          color: 13632027,
          description: `I couldn't find that user, perhaps you gave the wrong username?` + `\n` + `You provided: \`${givenUsername}\``,
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL()
        },
        footer: {
          text: "jave"
        }
      }
    });
   })
	},
};
