const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms');

require('dotenv').config();

const allowedRanks = process.env.AllowedRanks.split(",");
module.exports = {
	name: 'gamemute',
	category: 'game',
    rolesRequired: [],

	description: 'mute someone in game',
	timeout: 1000,
	run: async (client, message, args) => {
    let req = client.request;
    if(req !== "No request") {
        return message.channel.send(client.embed("In Use", `Someone already has a request activated! Please wait for this request to expire. If the Roblox servers are down, make this request expire using the force command`));
    }

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
        return message.channel.send(client.embed("No Username Supplied", "You didn't supply a username for me to mute"));
    }

    let newRequest = {
        usernameToMute: username,

        type: "Mute",
        channelID: message.channel.id,
        authorID: message.author.id
    }

    client.request = newRequest;

    message.channel.send(client.embed( "Sent Request", `I have successfully sent the request over for Roblox to read! If there is no response, it's most likely that the server is down`));
	},
};
