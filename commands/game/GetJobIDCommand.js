const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

require('dotenv').config();

const allowedRanks = process.env.AllowedRanks.split(",");
module.exports = {
	name: 'getplayerserverid',
	category: 'game',
    rolesRequired: [],

	description: 'Get the server ID a player is in. Used in !lockdown.',
	timeout: 1000,
	run: async (client, message, args) => {
        let isAllowed = false;
    for(let i = 0; i < allowedRanks.length; i++) {
        if(message.member.roles.cache.some(role => [allowedRanks[i]].includes(role.name))) {
            isAllowed = true;
        }
    }

    if(isAllowed == false) {
        return message.channel.send(client.embed( "No Permission", "You don't have permission to run this command"));
    }

    let username = args[0];
    if(!username) {
        return message.channel.send(client.embed( "No Username Supplied", `You didn't supply a player's username for me to grab their server's job id from`))
    }

    let newRequest = {
        userToCheck: username,

        type: "GetPlayerJobId",
        channelID: message.channel.id,
        authorID: message.author.id
    }

    client.request = newRequest;

    message.channel.send(client.embed("Sent Request", `I have successfully sent the request over for Roblox to read! If there is no response, it's most likely that the server is down or the player that you supplied isn't in the game`));
	},
};
