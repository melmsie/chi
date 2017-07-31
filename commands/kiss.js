const snekfetch = require('snekfetch');
const config = require('../config.json');
exports.run = async function (client, msg,args) {
        if (args < 1) return message.reply(" :x: O.o you wanna kiss yourself??");
        snekfetch.get('https://nekos.life/api/kiss')
            .set('Key', config.nekokey)
            .then(r => msg.channel.send(`${args} You got a kiss from ${msg.author.username} :heart:`,{
            embed: {
                color: 5881576,
                image: {
                    url: r.body.url
                }
            }
        }).catch(e => console.warn('wew tf happened here ' + e)));


};

