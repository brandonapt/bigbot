const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

require('dotenv').config();

const allowedRanks = process.env.AllowedRanks.split(",");
module.exports = {
	name: 'ismuted',
    rolesRequired: [],
	category: 'game',
	description: 'checks if a user is muted',
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
        return message.channel.send(client.embed( "No Username Supplied", `You didn't supply a username for me to check mute status on`))
    }

    let newRequest = {
        userToCheck: username,

        type: "CheckMute",
        channelID: message.channel.id,
        authorID: message.author.id
    }

    client.request = newRequest;

    message.channel.send(client.embed( "Waiting for Server...", `Waiting for the game server to send back what I requested...`));
	},
};
