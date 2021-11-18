const { MessageEmbed } = require('discord.js');
const allowedRanks = process.env.AllowedRanks.split(",");
const noblox = require('noblox.js')
const discord = require('discord.js')
module.exports = {
	name: 'getfriends',
	category: 'roblox',
	description: 'gets roblox friends',
	timeout: 1000,
  usage: '',
  rolesRequired: allowedRanks,
	run: async (client, message, args) => {
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
