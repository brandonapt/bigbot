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

client.login(BOT_TOKEN)
	.then(() => console.log('[DJS] - Bot has successfully logged in'))