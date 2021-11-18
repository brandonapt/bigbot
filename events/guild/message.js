const db = require('block.db')
const db2 = require('quick.db')
const Timeout = new Set();
const ms = require('ms');
const Discord = require('discord.js')

module.exports = async (client, message) => {

	if (message.author.bot) return
	if (!message.content.toLowerCase().startsWith(client.prefix)) return

	if (!message.member) {
		message.member = await message.guild.fetchMember(message);
	}

	if (!message.guild) return;

    const args = message.content.slice(client.prefix.length).split(" ");
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
  const rolesData = db2.get(`${cmd}_roles_${message.guild.id}`)

  if (rolesData == null) {
    db2.set(`${cmd}_roles_${message.guild.id}`, [])
  }

	if (!command) command = client.commands.get(client.aliases.get(cmd));



	if (command) {
      //console.log(rolesData)
        for (i in rolesData) {

        //console.log(rolesData[i])
        if (!message.member.roles.cache.has(rolesData[i])) {
                                let embed2 = new Discord.MessageEmbed();
            embed2.setDescription('You do not have permission to use this command.');
            embed2.setColor("RED");
            embed2.setAuthor(message.author.tag, message.author.displayAvatarURL());
            return message.channel.send(embed2);
      }
        }
    let enabled = db.get(`${message.guild.id}_${command.category}_enabled`)
    if (enabled == null) {
      db.set(`${message.guild.id}_${command.category}_enabled`,true)
    }
    if (enabled == false ) {
      const embed1 = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription('This module is disabled.')
      return message.channel.send(embed1)
    }
    const timeoutThing = db2.get(`${command.name}_timeout_${message.guild.id}`)
    //console.log('a ' + db2.get(`${command.name}_timeout_
			if (timeoutThing != null) {
      if (Timeout.has(`${message.author.id}${command.name}`)) {
        const embed1 = new Discord.MessageEmbed()
        .setColor("RED")
        const prettyMilliseconds = require('pretty-ms');
        embed1.setDescription(`You can only use this command every ${prettyMilliseconds(timeoutThing, {verbose: true})}!`)
				return message.reply(embed1)
      }
			

      

/*
            if(command.rolesRequired.length > 0) {
        if(!message.member.roles.cache.some(role => command.rolesRequired.includes(role.name))) {
            let embed = new Discord.MessageEmbed();
            embed.setDescription('You do not have permission to use this command.');
            embed.setColor("RED");
            embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
            return message.channel.send(embed);
        }
    }
    */
    
        }
    //console.log(rolesData)
              //console.log(timeoutThing)
			command.run(client, message, args);
			Timeout.add(`${message.author.id}${command.name}`);
			setTimeout(() => {
				Timeout.delete(`${message.author.id}${command.name}`);
			}, timeoutThing);
		} else {
          for (i in rolesData) {

        //console.log(rolesData[i])
        if (!message.member.roles.cache.has(rolesData[i])) {
                      let embed2 = new Discord.MessageEmbed();
            embed2.setDescription('You do not have permission to use this command.');
            embed2.setColor("RED");
            embed2.setAuthor(message.author.tag, message.author.displayAvatarURL());
            return message.channel.send(embed2);
      }
          }
			command.run(client, message, args);
		}
	
};
