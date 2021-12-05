const db = require('block.db')
const db2 = require('quick.db')
const Timeout = new Set();
const ms = require('ms');
const Discord = require('discord.js')
const {
    toUnicode
} = require('punycode')

module.exports = async (client, member) => {
    let guild = member.guild
    let name = member.user.tag
    let id = member.user.id
	member.send('Welcome, ' + member.user.tag + "!")
	
};
