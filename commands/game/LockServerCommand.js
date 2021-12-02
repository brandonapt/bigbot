const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms');

require('dotenv').config();

const allowedRanks = process.env.AllowedRanks.split(",");
module.exports = {
	name: 'lockserver',
    rolesRequired: [],

	category: 'game',
	description: 'lock a server using the id',
	timeout: 1000,
	run: async (client, message, args) => {
    let req = client.request;
    if(req !== "No request") {
        return message.channel.send(client.embed( "In Use", `Someone already has a request activated! Please wait for this request to expire. If the Roblox servers are down, make this request expire using the force command`));
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

    let type = args[0];
    if(!type) {
        return message.channel.send(client.embed( "No Type Supplied", `You didn't supply the type of lockdown for me to preform`));
    }

    if(type.toLowerCase() !== "global" && type.toLowerCase() !== "jobid") {
        return message.channel.send(client.embed( "Invalid Type Supplied", "The type of lockdown that you supplied isn't valid"));
    }

    if(type.toLowerCase() === "global") {
        
        let reason = args.splice(1).join(" ");
        if(!reason) {
            return message.channel.send(client.embed( "No Reason Supplied", `You didn't supply a reason for me to lock all the servers`));
        }

        let newRequest = {
            author: message.author.tag,
            reason: reason,
            isGlobal: true,

            type: "Lockdown",
            channelID: message.channel.id,
            authorID: message.author.id
        }

        client.request = newRequest;

        message.channel.send(client.embed( "Sent Request", `I have successfully sent the request over for Roblox to read! If there is no response, it's most likely that the server is down`));


    } else {

        let jobID = args[1];
        if(!jobID) {
            return message.channel.send(client.embed( "No Job ID Supplied", `You didn't supply a job id for the server that you want me to lock`));
        }

        let reason = args.splice(2).join(" ");
        if(!reason) {
            return message.channel.send(client.embed( "No Reason Supplied", `You didn't supply a reason for me to lock the server`));
        }

        let newRequest = {
            author: message.author.tag,
            reason: reason,
            jobID: jobID,
            isGlobal: false,

            type: "Lockdown",
            channelID: message.channel.id,
            authorID: message.author.id
        }

        client.request = newRequest;

           message.channel.send(client.embed( "Waiting for Server...", `Waiting for the game server to send back what I requested...`));
	}
  },
};
