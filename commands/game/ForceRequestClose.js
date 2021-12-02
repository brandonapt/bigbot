const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms');

require('dotenv').config();

module.exports = {
	name: 'closerequest',
	category: 'game',
    rolesRequired: [],

	description: 'closes a api request',
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

    client.request = "No request";
    return message.channel.send(client.embed( "Success", `I have successfully forced the on-going request to close`));
	},
};
