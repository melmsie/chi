const config = require('./config.json')
const snekfetch = require('snekfetch')
const Discord = require('discord.js')
const client = new Discord.Client({
	disableEveryone: true
})

client.login(config.token)

client.on('message', msg => {

if (msg.channel.type === 'dm' || !msg.content.toLowerCase().startsWith(config.prefix)) return

	if (msg.isMentioned(client.user.id) && msg.content.includes('help'))
		return msg.channel.send(`Hello, ${msg.author.username}. My prefix is \`${config.prefix}\`. Example: \`${config.prefix}help\``)


	let command = msg.content.slice(config.prefix.length).toLowerCase().split(' ')[0]
	const args = msg.content.split(' ').slice(1)

	try {
		delete require.cache[require.resolve(`./commands/${command}`)]
		require(`./commands/${command}`).run(client, msg, args, config, Discord)
	} catch (e) {
		if (e.message.includes('Cannot find module')) return
		return console.log(e)
	}
})

client.on('guildCreate', guild => {

	snekfetch
		.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
		.set('Authorization', config.orgtoken)
		.send({
			'server_count': client.guilds.size
		})
		.then(console.log('Updated dbots status.'))

})

client.once('ready', () => {

	console.log(`[${new Date()}] ${client.user.username} loaded successfully.`)

	client.user.setGame('H-Hello')
})

process.on('unhandledRejection', err => {
	console.error(`${Date()}\n Uncaught Promise Error: \n${err.stack}`)
})