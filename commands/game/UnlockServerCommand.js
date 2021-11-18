const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms');

require('dotenv').config();

module.exports = {
	name: 'unlockserver',
	category: 'game',
    rolesRequired: [],
	description: 'unlock a server',
	timeout: 1000,
	run: async (client, message, args) => {
let req = client.request;
    if(req !== "No request") {
        return message.channel.send(client.embed( "In Use", `Someone already has a request activated! Please wait for this request to expire. If the Roblox servers are down, make this request expire using the force command`));
    }



    let type = args[0];
    if(!type) {
        return message.channel.send(client.embed( "No Type Supplied", `You didn't supply the type of unlock for me to preform`));
    }

    if(type.toLowerCase() !== "global" && type.toLowerCase() !== "jobid") {
        return message.channel.send(client.embed( "Invalid Type Supplied", "The type of unlock that you supplied isn't valid"));
    }

    if(type.toLowerCase() === "global") {

        let newRequest = {
            isGlobal: true,

            type: "Unlock",
            channelID: message.channel.id,
            authorID: message.author.id
        }

        client.request = newRequest;

        message.channel.send(client.embed( "Sent Request", `I have successfully sent the request over for Roblox to read! If there is no response, it's most likely that the server is down`));

        let timeString = `${process.env.cooldown}s`;
        setTimeout(() => {
            unlockCoolDowns.delete(message.author.id);
        }, ms(timeString));
    } else {

        let jobID = args[1];
        if(!jobID) {
            return message.channel.send(client.embed("No Job ID Supplied", `You didn't supply a job id for the server that you want me to unlock`));
        }

        let newRequest = {
            jobID: jobID,
            isGlobal: false,

            type: "Unlock",
            channelID: message.channel.id,
            authorID: message.author.id
        }

        client.request = newRequest;

        message.channel.send(client.embed( "Sent Request", `I have successfully sent the request over for Roblox to read! If there is no response, it's most likely that the server is down or the job ID that you supplied isn't valid`));
    }
	},
};
