const Discord = require('discord.js');
const fetch = require('node-fetch');

let config = {
    groupId: '5440059',
    groupIconURL: 'https://t6.rbxcdn.com/f758f34e809b0f1e9eab9c5ab921851e',
    webhookId: '911051941377871904',
    webhookToken: 'h5tVXabsfT8IpTdm9LFGuLHq9pJrFXOzyMK0u4beBBQUDbkOL5Fd1MPTzMcPt2OT-qKk'
}

let client = new Discord.WebhookClient(config.webhookId, config.webhookToken);

let milestones = ['300'];
let currentCount = 0;
let firstCheck = true;

let refreshCount = async () => {
    let groupResponse = await fetch(`https://groups.roblox.com/v1/groups/${config.groupId}`);
    let groupBody = await groupResponse.json();
    let newCount = groupBody.memberCount;
    if(firstCheck === true) {
        firstCheck = false;
        currentCount = newCount;
        return setTimeout(refreshCount, 30000);
    }
    if(milestones.some(milestone => newCount > milestone && currentCount < milestone)) {
        let milestoneReached = milestones.find(milestone => newCount > milestone && currentCount < milestone);
        let embed = new Discord.MessageEmbed();
        embed.setAuthor(groupBody.name, config.groupIconURL);
        embed.setTitle('🎉 Milestone Reached!');
        embed.setDescription(`${groupBody.name} just hit the ${milestoneReached} group member count milestone!`);
        embed.setColor('#33cc66');
        return client.send(embed);
    }
    if(newCount !== currentCount) {
        if(newCount > currentCount) {
            client.send(`⬆️ The group member count has increased! It is now at ${newCount}.`);
        }
        if(newCount < currentCount) {
            client.send(`⬇️ The group member count has decreased! It is now at ${newCount}.`);
        }
    }
    currentCount = newCount;
    setTimeout(refreshCount, 30000);
}

refreshCount();
console.log('[MEMBER COUNTING] Started member counter!');