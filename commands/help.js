
exports.run = async function (client, msg) {
	await msg.channel.send({
		embed: {
			title: 'Current Commands (v0.0.1)',
			color: '5881576',
			description: 'I should have more commands coming soon, just waiting on Melmsie-senpai to get off his lazy butt!',
			thumbnail: {
				url: client.user.displayAvatarURL({
					format: 'png',
					size: 256
				})
			},
			fields: [
				{ name: '+invite', value: 'Get my current invite so I can join you!' },
				{ name: '+kitty', value: 'Awww, a kitty!' },
				{ name: '+neko', value: 'Cat girls anyone?' },
				{ name: '+neko lewd', value: 'LEWD Cat girls anyone?' },
				{ name: '+puppy', value: 'I love puppies!' },
			],
			footer: {
				text: `Requested by ${msg.author.tag}`
			}
		}
	})
}
