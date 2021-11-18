const Discord = require('discord.js')
    module.exports = async (client) => {
    const errorEmbed = new Discord.MessageEmbed()
      .setTitle('Whoops!')
      .setColor('RED')
      .setTimestamp()
    const infoEmbed = new Discord.MessageEmbed()
      .setTitle('Info')
      .setColor('ORANGE')
      .setTimestamp()
    const successEmbed = new Discord.MessageEmbed()
      .setTitle('Success')
      .setColor("GREEN")
      .setTimestamp()

    client.errorEmbed = errorEmbed;
    client.infoEmbed = infoEmbed;
    client.successEmbed = successEmbed;
    client.embed = function embed(title, description) {
    let embed = new Discord.MessageEmbed();
    embed.setColor("GREY");
    embed.setTitle(title);
    embed.setTimestamp();
    embed.setDescription(description);
    embed.setFooter('brandonn');
    return embed;
}
};

