const { MessageEmbed } = require('discord.js');
const noblox = require('noblox.js')
const discord = require('discord.js')
module.exports = {
	name: 'getfriends',
	category: 'roblox',
	description: 'gets roblox friends',
	timeout: 1000,
  usage: '',
  rolesRequired: [],
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
    let friends
    const account = await noblox.getCurrentUser()
    try {
      friends = await noblox.getFriends(account.UserID)
    } catch (e) {
      let embed1 = new MessageEmbed()
        .setTitle('Whoops!')
        .setDescription('An error occured!')
        .setColor("RED")

      return message.channel.send(embed1)
    }
    const embed = new MessageEmbed()
      .setTitle('Friends')
      .setColor("RANDOM")
      .setTimestamp()

    //console.log(friends)

    if (!friends.data[0]) {
      embed.setDescription('No friends!')
      return message.channel.send(embed)
    }

    for (i in friends.data) {
      embed.addField(friends.data[i].name, friends.data[i].id)
    }
    
    message.channel.send(embed)


    
	},
};
