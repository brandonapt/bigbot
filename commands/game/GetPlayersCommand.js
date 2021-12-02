const { MessageEmbed } = require('discord.js');
const allowedRanks = process.env.AllowedRanks.split(",");
const noblox = require('noblox.js')
const discord = require('discord.js')
module.exports = {
	name: 'getplayers',
	category: 'game',
	description: 'get players',
	timeout: 1000,
  rolesRequired: allowedRanks,
	run: async (client, message, args) => {
    let newRequest = {
        type: "GetPlayers",
        channelID: message.channel.id,
        authorID: message.author.id
    }

    client.request = newRequest;

    message.channel.send(client.embed( "Waiting for Server...", `Waiting for the game server to send back what I requested...`));
	},
};
