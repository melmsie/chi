const snekfetch = require('snekfetch')
exports.run = function (client, msg) {
	let cat = await snekfetch.get('http://random.cat/meow')
	await msg.channel.send({
            embed: {
                color: '5881576',
                image: {
                    url: cat.body.file
                },
                footer: {
                    text: `Requested by ${msg.author.tag}`
                }
            }
        })
}
