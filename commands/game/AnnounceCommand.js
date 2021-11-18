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

    message.channel.send(client.embed( "Sent Request", `I have successfully sent the request over for Roblox to read! If there is no response, it's most likely that there are no games running!`));

  
},
};