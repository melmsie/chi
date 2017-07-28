const config = require('./config.json')
const snekfetch = require('snekfetch')
const Discord = require('discord.js')
const client = new Discord.Client({
	disableEveryone: true
})
const metrics = require('datadog-metrics')
metrics.init({
	apiKey: config.datadog.APIkey,
	appKey: config.datadog.APPkey,
	flushIntervalSeconds: 1,
	prefix: 'chi.'
})

client.on('message', msg => {
	metrics.increment('messages.seen')
if (msg.channel.type === 'dm' || !msg.content.toLowerCase().startsWith(config.prefix)) return

	if (msg.isMentioned(client.user.id) && msg.content.includes('help'))
		return msg.channel.send(`Hello, ${msg.author.username}. My prefix is \`${config.prefix}\`. Example: \`${config.prefix}help\``)


	let command = msg.content.slice(config.prefix.length).toLowerCase().split(' ')[0]
	const args = msg.content.split(' ').slice(1)

	try {
		collectCmdStats()
		delete require.cache[require.resolve(`./commands/${command}`)]
		require(`./commands/${command}`).run(client, msg, args, config, Discord)
		
	} catch (e) {
		if (e.message.includes('Cannot find module')) return
		return console.log(e)
	}
})

client.on('guildCreate', guild => {
	metrics.increment('guild.joined', 1, 'events', 'join.event')
	snekfetch
		.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
		.set('Authorization', config.orgtoken)
		.send({
			'server_count': client.guilds.size
		})
		.then(console.log('Updated dbots status.'))

})
client.on('guildDelete', () => {
	metrics.increment('guild.left', 1, 'events', 'leave.event')
})

client.once('ready', () => {

	console.log(`[${new Date()}] ${client.user.username} loaded successfully.`)

	client.user.setGame('Hi!')

	setInterval(collectTechnicalStats, 3000)
	setInterval(collectBotStats, 30000)
})

process.on('unhandledRejection', err => {
	console.error(`${Date()}\n Uncaught Promise Error: \n${err.stack}`)
})

client.login(config.token)

function collectTechnicalStats() {
	var memUsage = process.memoryUsage()
	metrics.gauge('ram.rss', (memUsage.rss / 1048576).toFixed())
	metrics.gauge('ram.heapUsed', (memUsage.heapUsed / 1048576).toFixed())
	
}

async function collectBotStats() {
	metrics.gauge('totalGuilds', client.guilds.size)
	metrics.gauge('totalUsers', client.users.size)
	
}

async function collectCmdStats() {
	metrics.increment('commands.total')
}
