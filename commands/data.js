const moment = require('moment')
require('moment-duration-format')
const package = require('../package.json')
exports.run = async function (client, msg, args, config, Discord) {
	await msg.channel.send({
		embed: {
			color: '5881576',
			fields: [
				{
					name: '-------------------------------------- Technical ---------------------------------------',
					value: '```\n' + 
					`Uptime          |   ${moment.duration(process.uptime(), 'seconds').format('dd:hh:mm:ss')}\n` +
					`Heap Used       |   ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\n` +
					`Ping            |   ${client.ping.toFixed(0)}ms\n` +
					`Build           |   v${config.version}\n` +
					'\n```'
				},
				{
					name: '--------------------------------------- Statistics --------------------------------------',
					value: '```\n' +
					`Guilds          |   ${client.guilds.size}\n` +
					`Users           |   ${client.users.size}\n` +
					`Large Guilds    |   ${client.guilds.filter(m => m.large).size}\n` +
					`Exclusivity     |   ${client.guilds.filter(g => (g.members.filter(m => m.user.bot).size) === 1).size}\n` +
					`NSFW Channels   |   ${client.guilds.filter(g => (g.channels.filter(m => m.name.includes('nsfw')).size)).size}\n` +
					'\n```'
				},
				{
					name: '-------------------------------------- Other Info --------------------------------------',
					value: '```\n' +
					`D.js Version    |   v${Discord.version}\n` +
					`Node Version    |   ${process.version}\n` +
					`Dependencies    |   ${Object.keys(package.dependencies).length}\n` +
					`Platform        |   ${process.platform}\n` +
					'\n```'
				}
			]
		}
	})
}