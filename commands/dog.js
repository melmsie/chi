const snekfetch = require('snekfetch')
exports.run = function (client, msg) {
	let dog = await snekfetch.get('https://random.dog/woof.json')
	await msg.channel.send({
            embed: {
                color: '5881576',
                image: {
                    url: dog.body.url
                },
                footer: {
                    text: `Requested by ${msg.author.tag}`
                }
            }
        })
