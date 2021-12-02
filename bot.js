require('dotenv').config();
const Discord = require('discord.js')
const { Client, Collection } = require('discord.js');
const fs = require('fs');
const discord = require('discord.js')
const Stats  = require('discord-live-stats');
const { BOT_TOKEN, PREFIX } = process.env;

const client = new Client({ disableEveryone: true });
const catagories = fs.readdirSync('./commands/')
const utils = require('./utils/roblox/bloxlink')
const array = ['command', 'event']

require('./database/init')(client)
require('./utils/roblox/init')
require('./utils/express/server')(client)
require('./utils/discord/embeds')(client)
require('./utils/roblox/bloxlink')
require('./utils/roblox/rankUtils')
require('./utils/roblox/memberCount')

client.commands = new Collection();
client.aliases = new Collection();
client.prefix = PREFIX;
client.categories = fs.readdirSync('./commands/');
client.utils = utils
client.cat = catagories;

array.forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

const GroupDefender = require("group-defender")
const defend = new GroupDefender( {
  delay: 120,
  cookie: process.env.cookie,
  groupId: process.env.groupId,
  webhook: process.env.logwebhook,
  demotionRank: 1
} )
defend.monit()

const { AntiRaid } = require("@slicybt5w/djs-anti-raid"); // import @slicybt5w/djs-anti-raid

const antiRaid = new AntiRaid(client, {
    rateLimit: 3, // Rate limit of actions.
    time: 30000, // Amount of time (in milliseconds)
    punishType: "removeRole", // ban, kick, editRole, removeRole
    verbose: true, // Extended Logs from module.
    ignoredUsers: [], // Array of User IDs that get ignored.
    ignoredRoles: [], // Array of Role IDs that get ignored.
    ignoredEvents: [] 
});



antiRaid.on("trying", (member, event, punishType) => {
    console.log(`I will trying do ${punishType} to stop ${member.user.tag} for ${event}`);
});

antiRaid.on("action", (member, type) => {
    client.channels.cache.get('914274529226928129').send(`${member.user.tag} has been ${type}`)
    console.log(`${member.user.tag} has been ${type}`);
});


client.login(BOT_TOKEN)
	.then(() => console.log('[DJS] - Bot has successfully logged in'))