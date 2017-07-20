const Discord = require('discord.js')
const snekfetch = require('snekfetch')
exports.run = function (client, msg, args) {
     if (msg.channel.nsfw) {
        snekfetch.get('https://nekos.life/api/neko')
            .then(r => message.channel.send({
                const embed = new Discord.RichEmbed()
                .setImage(r.body.neko)
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
                .setColor(`BLACK`)
            }).catch(err => msg.channel.send('Error: ```' + err + '```');
        } else {
           msg.channel.send('Please be in a nsfw marked channel!')
      } 
    }
