const Discord = require('discord.js')
const snekfetch = require('snekfetch')
exports.run = async function (client, msg, args) {

   
    if (args[0] === 'lewd') {
        
        if (!msg.channel.nsfw) return msg.channel.send('I don\'t think I\'m allowed to post those here... Maybe try a NSFW marked channel?')
        
        let lewd = await snekfetch.get('https://nekos.life/api/lewd/neko')
        await msg.channel.send({
            embed: {
                color: '5881576',
                image: {
                    url: lewd.body.neko
                },
                footer: {
                    text: `Requested by ${msg.author.tag}`
                }
            }
        })
    } else {
        let lewd = await snekfetch.get('https://nekos.life/api/neko')
        await msg.channel.send({
            embed: {
                color: '5881576',
                image: {
                    url: lewd.body.neko
                },
                footer: {
                    text: `Requested by ${msg.author.tag}`
                }
            }
        })
    }


}