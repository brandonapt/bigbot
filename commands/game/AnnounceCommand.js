const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms');

require('dotenv').config();


/**
* @param {Discord.Message} message
* @param {Discord.Client} client
* @param {String[]} args
*/
module.exports = {
	name: 'announce',
	category: 'game',
    rolesRequired: [],
	description: 'Announces Something to the Cafe',
	timeout: 1000,
	run: async (client, message, args) => {

const allowedRanks = process.env.AllowedRanks.split(",");

    let isAllowed = false;
    for(let i = 0; i < allowedRanks.length; i++) {
        if(message.member.roles.cache.some(role => [allowedRanks[i]].includes(role.name))) {
            isAllowed = true;
        }
    }


    let strArgs = args.join(" ");

    let title = strArgs.substring(strArgs.indexOf('"') + 1, strArgs.lastIndexOf('"'));
    if(!title) {
        return message.channel.send(client.embed( "No Title Supplied!", "You didn't supply a title for the announcement!"));
    }

    let description = strArgs.substring(strArgs.lastIndexOf('"') + 2, strArgs.length);
    if(!description) {
        return message.channel.send(client.embed("No Description Supplied!", "You didn't supply a description for the announcement!"));
    }

    let newRequest = {
        author: message.author.tag,
        title: title,
        description: description,

        type: "Announcement",
        channelID: message.channel.id,
        authorID: message.author.id
    }

    client.request = newRequest;

    message.channel.send(client.embed( "Waiting for Server...", `Waiting for the game server to send back what I requested...`));

  
},
};